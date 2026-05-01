# Deployment runbook — Hetzner Cloud (or any Ubuntu VPS)

> **Scope.** This runbook deploys System 1 (the Next.js website + inbound
> contact form) to a VPS you control over SSH, with **Nginx** as the
> TLS-terminating reverse proxy and **PM2** as the Node process manager.
> It assumes Ubuntu 22.04 or 24.04 LTS.
> Target: `https://mediterra-fresh.com` served by `<your-server-ip>`
> (the actual IP is private to your team — do not commit it).

## Prerequisites

| Concern | Required value | Where it lives |
|---------|----------------|----------------|
| Server IP | e.g. `<your-server-ip>` | Hetzner Cloud Console |
| SSH access | `root` or sudo user with public key | Your `~/.ssh/` |
| Domain | `mediterra-fresh.com` | Cloudshare DNS panel |
| DNS records | A `@ → <your-server-ip>`, A `www → <your-server-ip>` | Cloudshare DNS panel |
| Resend API key | `re_…` | https://resend.com after domain verification |

> **Cloudshare-specific note.** "Cloudshare" hosts in Hetzner's Ashburn,
> Virginia data centre. Latency from Morocco is ~120 ms — completely
> acceptable for a mostly-static showcase site, especially with Cloudflare
> in front. If response time becomes a concern, put Cloudflare (free plan)
> in front for global edge caching.

## 0. Decisions to make once

| Decision | Recommended | Why |
|----------|-------------|-----|
| Deploy user | `deploy` (non-root) | Least privilege, reduces blast radius |
| App location | `/srv/mediterra-fresh` | Consistent FHS-compliant path |
| Node version | **20 LTS** | Matches `package.json` engines |
| Process manager | **PM2** | Survives reboots, auto-restart on crash |
| Reverse proxy | **Nginx** | TLS, gzip, caching, rate-limiting in one tool |
| TLS | **Let's Encrypt** via Certbot | Free, auto-renews |
| Firewall | UFW: 22, 80, 443 only | Block everything else |
| Coexistence with existing site | **Inspect first** | See section 1 |

---

## 1. Inspect what's already on the server

Before any change, capture the current state. This protects whatever is
there (could be a placeholder, a staging site, another client's project).

```bash
ssh deploy@<your-server-ip>  # or whatever user you have

# What's listening on the public ports?
sudo ss -tlnp | grep -E ':80|:443'

# Is nginx already running and what sites does it serve?
sudo systemctl status nginx 2>/dev/null
sudo nginx -T 2>/dev/null | grep -E 'server_name|listen|root|proxy_pass' | head -40

# Apache fallback (some Hetzner one-clicks use Apache)
sudo systemctl status apache2 2>/dev/null
sudo apachectl -S 2>/dev/null

# What domains have been issued certificates?
sudo ls /etc/letsencrypt/live 2>/dev/null

# What other Node processes are running?
sudo systemctl list-units --type=service --state=running | grep -iE 'node|pm2|next' || true
pm2 ls 2>/dev/null || true

# Snapshot before we touch anything
sudo tar czf /root/pre-mediterra-snapshot-$(date +%F).tar.gz \
  /etc/nginx/sites-enabled \
  /etc/letsencrypt 2>/dev/null
```

If something else is hosted (e.g. a placeholder Apache page), decide:

- **Replace it entirely** — rename or remove its Nginx/Apache config and
  remove its DocumentRoot.
- **Coexist on the same server** — keep both, give Nginx a separate
  `server_name` block per domain. This runbook does not remove anything;
  it adds a new vhost for `mediterra-fresh.com`.

---

## 2. Server provisioning (one-time)

### 2.1 Create a deploy user (skip if already done)

```bash
# As root (or via Hetzner web-console initial root login)
adduser --disabled-password --gecos "" deploy
usermod -aG sudo deploy
mkdir -p /home/deploy/.ssh
cp /root/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys

# Allow passwordless sudo for routine ops (optional)
echo 'deploy ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/deploy
chmod 440 /etc/sudoers.d/deploy
```

### 2.2 Lock down SSH

```bash
sudo sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo sed -i 's/^#*PermitRootLogin.*/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
sudo systemctl restart ssh
```

### 2.3 Install dependencies

```bash
sudo apt-get update
sudo apt-get install -y curl ca-certificates gnupg ufw fail2ban git nginx \
    certbot python3-certbot-nginx

# Node 20 LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v   # → v20.x

# pnpm or npm? Stick with npm for parity with package-lock.json
sudo npm i -g pm2
pm2 startup systemd -u deploy --hp /home/deploy   # follow the printed command
```

### 2.4 Firewall

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw status verbose
```

### 2.5 Fail2ban (basic SSH protection)

```bash
sudo systemctl enable --now fail2ban
```

---

## 3. Deploy the application

### 3.1 Get the code on the server (initial clone)

**Recommended:** clone the public GitHub repo on the server, deploy by
`git pull`. No GitHub Actions, no SSH-from-laptop, no rsync — just a single
script the deploy user runs.

```bash
# As the deploy user, on the server
sudo -u deploy bash <<'EOF'
APP_DIR=/var/www/trend-sites/mediterra-fresh.com
mkdir -p "$APP_DIR"
cd "$APP_DIR"
# If the directory was previously populated by rsync (the first-ever deploy
# was from your laptop), bind it to git in place:
if [ ! -d .git ]; then
  git init -q
  git remote add origin https://github.com/devcloud-consulting/mediterra-fresh.git
fi
git fetch origin main
git reset --hard origin/main
EOF
```

> **Public vs private repo.** Anonymous HTTPS pull works for public repos —
> nothing else to configure. If you later make the repo private, switch the
> remote to SSH and add a *deploy key* on GitHub:
> `git remote set-url origin git@github.com:devcloud-consulting/mediterra-fresh.git`
> then drop a read-only deploy key at `/home/deploy/.ssh/id_ed25519` and
> register its public half on GitHub → repo → Settings → Deploy keys.

### 3.2 Install + build on the server

```bash
ssh deploy@<your-server-ip>
cd /var/www/trend-sites/mediterra-fresh.com
npm ci --omit=dev=false   # install everything; build needs devDeps
npm run build             # produces .next/
```

### 3.3 Environment file

```bash
cat > /var/www/trend-sites/mediterra-fresh.com/.env.production <<'EOF'
NEXT_PUBLIC_SITE_URL=https://mediterra-fresh.com
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL_TO=contact@mediterra-fresh.com
CONTACT_EMAIL_FROM=Mediterra Fresh <hello@mediterra-fresh.com>
NODE_ENV=production
PORT=3000
EOF
chmod 600 /var/www/trend-sites/mediterra-fresh.com/.env.production
```

### 3.4 PM2

`ecosystem.config.cjs` is committed at the repo root. Start it the first
time, then save the state so it survives reboots:

```bash
cd /var/www/trend-sites/mediterra-fresh.com
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 ls                          # should show mediterra-fresh online
curl -I http://127.0.0.1:3000   # → HTTP/1.1 200

# Boot persistence (one-time, prints a sudo command — run it):
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 \
    startup systemd -u deploy --hp /home/deploy
```

### 3.5 Subsequent deploys (the everyday workflow)

The repo ships `scripts/deploy.sh`, which fetches `origin/main`, rebuilds,
and reloads PM2. You only ever run that one command from your laptop:

```bash
ssh deploy@<your-server-ip> 'cd /var/www/trend-sites/mediterra-fresh.com && ./scripts/deploy.sh'
```

If something is wrong post-deploy, roll back to the previous commit:

```bash
ssh deploy@<your-server-ip> 'cd /var/www/trend-sites/mediterra-fresh.com && ./scripts/rollback.sh'
```

> **Why pull, not push?** GitHub Actions for a public repo is free, but
> SSH-pull keeps the deploy minute-counter at zero, has no shared CI state,
> and means the server is the single source of truth for what's running.
> If you ever need automation, wrap the `ssh … deploy.sh` call in a cron
> job or a webhook receiver.

---

## 4. Nginx + TLS

### 4.1 Vhost

```bash
sudo tee /etc/nginx/sites-available/mediterra-fresh.com >/dev/null <<'NGINX'
# Plain HTTP — Certbot will rewrite this block on first cert issue.
server {
    listen 80;
    listen [::]:80;
    server_name mediterra-fresh.com www.mediterra-fresh.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS reverse-proxy to Next.js
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name mediterra-fresh.com www.mediterra-fresh.com;

    # ssl_certificate / ssl_certificate_key are added by Certbot below.

    # Security headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), camera=(), microphone=()" always;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;

    # Hide Nginx version
    server_tokens off;

    # Static assets — long cache, served by Nginx directly
    location /_next/static/ {
        alias /srv/mediterra-fresh/.next/static/;
        expires 365d;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /images/ {
        alias /srv/mediterra-fresh/public/images/;
        expires 30d;
        access_log off;
        add_header Cache-Control "public, max-age=2592000";
    }

    # All other traffic → Next.js
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 60s;
    }

    # Block obvious bot traffic to wp-* / phpmyadmin / .env etc.
    location ~ /\.(env|git|svn|hg) { deny all; return 404; }
    location ~ \.(php|aspx|jsp)$  { deny all; return 404; }

    client_max_body_size 2m;
    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
}
NGINX

sudo mkdir -p /var/www/certbot
sudo ln -sf /etc/nginx/sites-available/mediterra-fresh.com \
            /etc/nginx/sites-enabled/mediterra-fresh.com
sudo nginx -t && sudo systemctl reload nginx
```

> If a previous default site is on `:80` listening to `default_server`,
> remove or rename the symlink at `/etc/nginx/sites-enabled/default` first.

### 4.2 DNS

Before requesting the certificate, make sure your domain resolves:

```bash
dig +short mediterra-fresh.com
dig +short www.mediterra-fresh.com
```

Both must return `<your-server-ip>`. If not, fix the DNS at Cloudshare and
**wait for propagation** (usually 5–30 min) before continuing.

### 4.3 Issue the Let's Encrypt certificate

```bash
sudo certbot --nginx \
  -d mediterra-fresh.com -d www.mediterra-fresh.com \
  --redirect --hsts --staple-ocsp \
  --email contact@mediterra-fresh.com \
  --agree-tos --no-eff-email
```

Certbot will modify the Nginx vhost to inject the certificate paths and
auto-redirect. Verify:

```bash
sudo nginx -t
sudo systemctl reload nginx
curl -I https://mediterra-fresh.com
# → HTTP/2 200, with security headers and HSTS
```

Renewal is handled by the systemd timer Certbot installs:

```bash
sudo systemctl list-timers | grep certbot
sudo certbot renew --dry-run    # confirm it works before walking away
```

---

## 5. Smoke tests

```bash
# Site reachable, status 200, with HSTS
curl -sI https://mediterra-fresh.com | head -10

# Sitemap and robots
curl -s https://mediterra-fresh.com/sitemap.xml | head -10
curl -s https://mediterra-fresh.com/robots.txt

# Manifest + apple icon
curl -sI https://mediterra-fresh.com/manifest.webmanifest
curl -sI https://mediterra-fresh.com/apple-touch-icon.png

# Localised landing pages
for L in fr en ar; do
  curl -s -o /dev/null -w "$L → %{http_code} %{size_download}B\n" \
    https://mediterra-fresh.com/$L
done

# Contact API — without RESEND_API_KEY it logs to stdout
curl -X POST https://mediterra-fresh.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Smoke Test","company":"Hôtel La Mamounia","email":"sysadmin@example.com","message":"Bonjour, ceci est un test post-déploiement."}' \
  -i
```

---

## 6. Updating to a new version

The repo ships `scripts/deploy.sh`, which fetches `origin/main`, rebuilds,
and reloads PM2. Just one command from your laptop:

```bash
ssh deploy@<your-server-ip> 'cd /var/www/trend-sites/mediterra-fresh.com && ./scripts/deploy.sh'
```

If you want to skip the SSH wrapper, do it directly on the server:

```bash
ssh deploy@<your-server-ip>
cd /var/www/trend-sites/mediterra-fresh.com
./scripts/deploy.sh
```

The script:
1. `git fetch + reset --hard origin/main`
2. `npm ci` (only if `package-lock.json` changed since last deploy)
3. `npm run build`
4. `pm2 reload mediterra-fresh --update-env`
5. Smoke-tests `http://127.0.0.1:3000` and exits non-zero on failure.

---

## 7. Rollback

```bash
ssh deploy@<your-server-ip> 'cd /var/www/trend-sites/mediterra-fresh.com && ./scripts/rollback.sh'
```

That rolls back to the previous git commit (`HEAD~1`), rebuilds, and
reloads PM2. Pass an explicit ref to go further:

```bash
ssh deploy@<your-server-ip> 'cd /var/www/trend-sites/mediterra-fresh.com && ./scripts/rollback.sh abc1234'
```

If Nginx config is the problem rather than the app:

```bash
sudo cp /etc/nginx/sites-available/mediterra-fresh.com.bak \
        /etc/nginx/sites-available/mediterra-fresh.com
sudo nginx -t && sudo systemctl reload nginx
```

(Always make a `.bak` copy before editing the vhost.)

---

## 8. Monitoring & alerts

| Layer | Tool | Notes |
|-------|------|-------|
| Uptime | <https://uptimerobot.com> (free) | Ping `https://mediterra-fresh.com` every 5 min |
| TLS expiry | Certbot timer + UptimeRobot SSL monitor | UR mails 30 days before expiry |
| Server | `htop`, `journalctl -u nginx -f`, `pm2 logs` | First 30 days; replace by Netdata or Hetzner Cloud monitoring later |
| Email deliverability | Resend dashboard + Google Postmaster Tools | Weekly review |

---

## Appendix — `ecosystem.config.cjs`

Drop this file at the repo root and commit it.

```js
module.exports = {
  apps: [
    {
      name: 'mediterra-fresh',
      cwd: '/srv/mediterra-fresh',
      script: 'node_modules/next/dist/bin/next',
      args: 'start --hostname 127.0.0.1 --port 3000',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '512M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      out_file: '/var/log/mediterra-fresh/out.log',
      error_file: '/var/log/mediterra-fresh/err.log',
      merge_logs: true,
      time: true,
    },
  ],
};
```

Create the log dir once: `sudo mkdir -p /var/log/mediterra-fresh && sudo chown deploy:deploy /var/log/mediterra-fresh`.
