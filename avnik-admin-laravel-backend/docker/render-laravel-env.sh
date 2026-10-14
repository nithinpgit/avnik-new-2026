#!/bin/sh
set -e

cd /app

if [ ! -f .env ] && [ -f .env.example ]; then
  cp .env.example .env
fi

if [ ! -f .env ]; then
  touch .env
fi

set_env() {
  key="$1"
  value="$2"

  if [ -z "$value" ]; then
    return 0
  fi

  if grep -q "^${key}=" .env; then
    sed -i "s|^${key}=.*|${key}=${value}|" .env
  else
    printf '%s=%s\n' "$key" "$value" >> .env
  fi
}

set_env APP_NAME "${APP_NAME:-Avnik}"
set_env APP_ENV "${APP_ENV:-production}"
set_env APP_DEBUG "${APP_DEBUG:-false}"
set_env APP_KEY "${APP_KEY}"
set_env APP_URL "${APP_URL}"
set_env LOG_CHANNEL "${LOG_CHANNEL:-stack}"
set_env DB_CONNECTION "${DB_CONNECTION:-mysql}"
set_env DB_HOST "${DB_HOST:-mysql}"
set_env DB_PORT "${DB_PORT:-3306}"
set_env DB_DATABASE "${DB_DATABASE}"
set_env DB_USERNAME "${DB_USERNAME}"
set_env DB_PASSWORD "${DB_PASSWORD}"
set_env CACHE_DRIVER "${CACHE_DRIVER:-file}"
set_env SESSION_DRIVER "${SESSION_DRIVER:-file}"
set_env QUEUE_CONNECTION "${QUEUE_CONNECTION:-sync}"
set_env FORCE_HTTPS "${FORCE_HTTPS:-false}"
set_env STRIPE_KEY "${STRIPE_KEY:-}"
set_env STRIPE_SECRET "${STRIPE_SECRET:-}"

if ! grep -qE '^APP_KEY=base64:.+' .env; then
  echo "[laravel-backend] generating APP_KEY..."
  php artisan key:generate --force
fi

echo "[laravel-backend] rendered .env for runtime"
