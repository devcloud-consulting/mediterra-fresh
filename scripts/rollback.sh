#!/usr/bin/env bash
#
# scripts/rollback.sh — roll back to the previous git commit
#
# Use when scripts/deploy.sh produced a broken build (smoke test failed,
# or you noticed an issue post-deploy). Reverts to the parent commit of
# whatever is currently checked out, rebuilds, and reloads PM2.
#
# Usage:
#   ssh deploy@<server>
#   cd /var/www/trend-sites/mediterra-fresh.com
#   ./scripts/rollback.sh
#
# To roll back further than one commit, pass a SHA or ref as the first arg:
#   ./scripts/rollback.sh abc1234

set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/trend-sites/mediterra-fresh.com}"
PM2_NAME="${PM2_NAME:-mediterra-fresh}"

if [[ "$(whoami)" == "root" ]]; then
  echo "Refusing to run as root. SSH in as the deploy user." >&2
  exit 1
fi

cd "$APP_DIR"

TARGET="${1:-HEAD~1}"
RESOLVED="$(git rev-parse --short "$TARGET")"
CURRENT="$(git rev-parse --short HEAD)"

echo "Rolling back: $CURRENT → $RESOLVED"
read -rp "Continue? [y/N] " ok
[[ "$ok" =~ ^[yY]$ ]] || { echo "aborted"; exit 1; }

git reset --hard "$RESOLVED"
npm ci --no-audit --no-fund --prefer-offline
npm run build
pm2 reload "$PM2_NAME" --update-env
pm2 save >/dev/null
echo "Rolled back. Now serving $RESOLVED."
