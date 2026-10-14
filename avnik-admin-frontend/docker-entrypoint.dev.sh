#!/bin/sh
set -e
cd /app
STAMP=node_modules/.docker-deps-ready
if [ ! -f "$STAMP" ] || [ ! -f package.json ] || [ package.json -nt "$STAMP" ]; then
  echo "[admin-frontend] npm install --legacy-peer-deps..."
  npm install --legacy-peer-deps --no-audit --no-fund
  touch "$STAMP"
fi

echo "[admin-frontend] starting Vite on :3000 (base path /admin)..."
npm run start -- --host 0.0.0.0 --port 3000 &
VITE_PID=$!

trap 'kill "$VITE_PID" 2>/dev/null || true' EXIT INT TERM

echo "[admin-frontend] starting nginx on :80..."
exec "$@"
