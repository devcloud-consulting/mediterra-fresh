/**
 * PM2 ecosystem file for the production VPS deployment.
 *
 * Usage on the server:
 *   cd /srv/mediterra-fresh
 *   pm2 start ecosystem.config.cjs --env production
 *   pm2 save
 *
 * See docs/09-deploy-vps.md for the full runbook.
 */
// `cwd` is intentionally relative: pm2 will use the directory you run
// `pm2 start ecosystem.config.cjs` from. That makes this file portable
// between /var/www/trend-sites/<domain> (current host) and /srv/<app>
// (the FHS pattern in docs/09-deploy-vps.md) without edits.
module.exports = {
  apps: [
    {
      name: 'mediterra-fresh',
      cwd: __dirname,
      script: 'node_modules/next/dist/bin/next',
      // Bind to 0.0.0.0 so Next.js's internal RSC fetcher resolves localhost
      // either via 127.0.0.1 (IPv4) or ::1 (IPv6) without ECONNREFUSED on
      // dual-stack hosts. Port 3000 is firewalled by UFW; only nginx on
      // 127.0.0.1 talks to it.
      args: 'start --hostname 0.0.0.0 --port 3000',
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
