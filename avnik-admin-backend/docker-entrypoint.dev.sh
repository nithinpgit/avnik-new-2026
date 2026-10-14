#!/bin/sh
set -e
cd /app
STAMP=node_modules/.docker-deps-ready
if [ ! -f "$STAMP" ] || [ ! -f package-lock.json ] || [ package-lock.json -nt "$STAMP" ]; then
  echo "[admin-backend] npm ci..."
  npm ci --no-audit --no-fund
  touch "$STAMP"
fi
exec "$@"
