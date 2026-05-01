#!/usr/bin/env bash
#
# scripts/deploy.sh — production deploy (server-side)
#
# What it does, in order:
#   1. cd into /var/www/trend-sites/mediterra-fresh.com (or $APP_DIR override)
#   2. git fetch + fast-forward pull from origin/main
#   3. npm ci (only if package-lock.json changed since last deploy)
#   4. npm run build
#   5. pm2 reload mediterra-fresh   (zero-downtime if cluster mode; instant
#      restart in fork mode — under 1s of 502s)
#   6. pm2 save                     (so the new state survives reboot)
#   7. Smoke-test http://127.0.0.1:3000
#
# Run on the server as the deploy user:
#   ssh deploy@<server>
#   cd /var/www/trend-sites/mediterra-fresh.com
#   ./scripts/deploy.sh
#
# Or as a one-liner from your laptop:
#   ssh deploy@<server> 'cd /var/www/trend-sites/mediterra-fresh.com && ./scripts/deploy.sh'
#
# Rollback: see scripts/rollback.sh.
# Initial setup: see docs/09-deploy-vps.md (sections 2 and 3).

set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/trend-sites/mediterra-fresh.com}"
BRANCH="${BRANCH:-main}"
PM2_NAME="${PM2_NAME:-mediterra-fresh}"
PORT="${PORT:-3000}"

bold()  { printf '\033[1m%s\033[0m\n' "$*"; }
green() { printf '\033[32m✓ %s\033[0m\n' "$*"; }
red()   { printf '\033[31m✗ %s\033[0m\n' "$*" >&2; }
hr()    { printf '%.0s─' $(seq 1 60); echo; }

if [[ "$(whoami)" == "root" ]]; then
  red "Refusing to run as root. SSH in as the deploy user instead."
  exit 1
fi

if [[ ! -d "$APP_DIR" ]]; then
  red "App directory not found: $APP_DIR"
  exit 1
fi

cd "$APP_DIR"

bold "Deploying $(basename "$APP_DIR") @ $(date -Iseconds)"
hr

# Capture current state for rollback log
PREV_SHA="$(git rev-parse --short HEAD 2>/dev/null || echo none)"
PREV_LOCK_HASH="$(test -f package-lock.json && md5sum package-lock.json | cut -d' ' -f1 || echo none)"

bold "1) git fetch + pull"
git fetch --prune origin "$BRANCH"
git reset --hard "origin/$BRANCH"
NEW_SHA="$(git rev-parse --short HEAD)"
green "moved $PREV_SHA → $NEW_SHA"

if [[ "$PREV_SHA" == "$NEW_SHA" ]]; then
  bold "Nothing to deploy — already at $NEW_SHA. Reloading anyway."
fi

NEW_LOCK_HASH="$(md5sum package-lock.json | cut -d' ' -f1)"
hr
if [[ "$PREV_LOCK_HASH" != "$NEW_LOCK_HASH" || ! -d node_modules ]]; then
  bold "2) npm ci (lockfile changed or node_modules missing)"
  npm ci --no-audit --no-fund --prefer-offline
  green "dependencies installed"
else
  green "2) skipping npm ci — lockfile unchanged"
fi

hr
bold "3) npm run build"
npm run build 2>&1 | tail -20
green "build complete"

hr
bold "4) pm2 reload $PM2_NAME"
if pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
  pm2 reload "$PM2_NAME" --update-env
else
  pm2 start ecosystem.config.cjs --env production
fi
pm2 save >/dev/null
green "pm2 reloaded"

hr
bold "5) Smoke test"
sleep 2
fail=0
for path in / /fr /en /ar /sitemap.xml /robots.txt; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:${PORT}${path}" || echo 000)
  case "$code" in
    200|301|307|308) green "$path → $code" ;;
    *)               red "$path → $code"; fail=1 ;;
  esac
done

hr
if (( fail )); then
  red "Smoke test failed — consider scripts/rollback.sh"
  exit 1
fi

bold "Deploy complete. Now serving $NEW_SHA."
