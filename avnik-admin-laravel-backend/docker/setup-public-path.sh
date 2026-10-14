#!/bin/sh
set -e

cd "$(dirname "$0")/../public"

# Legacy frontend URLs use /public/assets/... while Laravel's web root is public/.
# Map /public/* -> /* so static files resolve in dev (artisan serve) and nginx.
if [ -L public ]; then
  :
elif [ -d public ]; then
  if [ ! -f public/assets/images/logo.svg ]; then
    echo "[laravel-backend] replacing stale public/public directory with symlink..."
    rm -rf public
    ln -sfn . public
    echo "[laravel-backend] created public/public symlink for legacy asset URLs"
  fi
else
  ln -sfn . public
  echo "[laravel-backend] created public/public symlink for legacy asset URLs"
fi

# Webpack emits lazy chunks to public/chunks/, but the app loads /public/js/chunks/*.js.
if [ -d chunks ] && [ ! -e js/chunks ]; then
  mkdir -p js
  ln -sfn ../chunks js/chunks
  echo "[laravel-backend] linked public/js/chunks -> public/chunks"
fi
