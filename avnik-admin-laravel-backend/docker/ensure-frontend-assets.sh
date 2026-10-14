#!/bin/sh
set -e

chunks_available() {
  if [ -d public/js/chunks ] && [ -n "$(ls -1 public/js/chunks/*.js 2>/dev/null | head -1)" ]; then
    return 0
  fi

  if [ -d public/chunks ] && [ -n "$(ls -1 public/chunks/*.js 2>/dev/null | head -1)" ]; then
    return 0
  fi

  return 1
}

frontend_assets_ready() {
  [ -f public/js/app.js ] \
    && [ -f public/css/app.css ] \
    && chunks_available
}

if frontend_assets_ready; then
  sh docker/setup-public-path.sh
  echo "[laravel-backend] frontend assets already built."
  exit 0
fi

echo "[laravel-backend] building frontend assets (npm run production)..."
npm run production

sh docker/setup-public-path.sh

if ! frontend_assets_ready; then
  echo "[laravel-backend] frontend build failed — chunk files are still missing."
  exit 1
fi

echo "[laravel-backend] frontend assets ready."
