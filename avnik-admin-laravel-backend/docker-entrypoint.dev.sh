#!/bin/sh
set -e
cd /app

mkdir -p storage/framework/sessions storage/framework/views storage/framework/cache storage/logs bootstrap/cache
chmod -R 775 storage bootstrap/cache

STAMP=vendor/.docker-deps-ready
if [ ! -f "$STAMP" ] || [ ! -f composer.lock ] || [ composer.lock -nt "$STAMP" ]; then
  echo "[laravel-backend] composer install..."
  composer install --no-interaction --prefer-dist
  touch "$STAMP"
fi

if [ ! -f .env ]; then
  cp .env.example .env
fi

if ! grep -qE '^APP_KEY=base64:.+' .env; then
  php artisan key:generate --force
fi

echo "[laravel-backend] waiting for MySQL at ${DB_HOST}:${DB_PORT}..."
until php -r "
  try {
    new PDO(
      'mysql:host=${DB_HOST};port=${DB_PORT}',
      '${DB_USERNAME}',
      '${DB_PASSWORD}'
    );
    exit(0);
  } catch (Throwable \$e) {
    exit(1);
  }
" 2>/dev/null; do
  sleep 2
done

php artisan config:clear

if [ "${SKIP_MIGRATIONS:-false}" = "true" ]; then
  echo "[laravel-backend] skipping migrations (SKIP_MIGRATIONS=true)"
else
  echo "[laravel-backend] running migrations..."
  php artisan migrate --force
fi

if [ ! -f storage/oauth-private.key ] || [ ! -f storage/oauth-public.key ]; then
  echo "[laravel-backend] generating Passport encryption keys..."
  php artisan passport:keys --force
fi
chmod 660 storage/oauth-private.key storage/oauth-public.key 2>/dev/null || true

CLIENT_COUNT=$(php -r "
  try {
    \$pdo = new PDO(
      'mysql:host=${DB_HOST};port=${DB_PORT};dbname=${DB_DATABASE}',
      '${DB_USERNAME}',
      '${DB_PASSWORD}'
    );
    echo (int) \$pdo->query('SELECT COUNT(*) FROM oauth_clients')->fetchColumn();
  } catch (Throwable \$e) {
    echo 0;
  }
" 2>/dev/null)

if [ "$CLIENT_COUNT" = "0" ]; then
  echo "[laravel-backend] installing Passport OAuth clients..."
  INSTALL_LOG=/tmp/passport-install.log
  php artisan passport:install --force 2>&1 | tee "$INSTALL_LOG"

  PERSONAL_ID=$(grep 'Client ID:' "$INSTALL_LOG" | head -1 | awk '{print $NF}')
  PERSONAL_SECRET=$(grep 'Client secret:' "$INSTALL_LOG" | head -1 | awk '{print $NF}')

  if [ -n "$PERSONAL_ID" ] && [ -n "$PERSONAL_SECRET" ]; then
    echo "[laravel-backend] updating Passport client credentials in .env..."
    if grep -q '^PASSPORT_PERSONAL_ACCESS_CLIENT_ID=' .env; then
      sed -i "s|^PASSPORT_PERSONAL_ACCESS_CLIENT_ID=.*|PASSPORT_PERSONAL_ACCESS_CLIENT_ID=${PERSONAL_ID}|" .env
      sed -i "s|^PASSPORT_PERSONAL_ACCESS_CLIENT_SECRET=.*|PASSPORT_PERSONAL_ACCESS_CLIENT_SECRET=${PERSONAL_SECRET}|" .env
    else
      printf '\nPASSPORT_PERSONAL_ACCESS_CLIENT_ID=%s\nPASSPORT_PERSONAL_ACCESS_CLIENT_SECRET=%s\n' \
        "$PERSONAL_ID" "$PERSONAL_SECRET" >> .env
    fi
  fi
else
  echo "[laravel-backend] syncing Passport credentials with imported database..."
  php docker/sync-passport-env.php || true
fi

php artisan config:clear

NPM_STAMP=node_modules/.docker-deps-ready
if [ ! -f "$NPM_STAMP" ] || [ ! -f package-lock.json ] || [ package-lock.json -nt "$NPM_STAMP" ]; then
  echo "[laravel-backend] npm install --legacy-peer-deps..."
  npm install --legacy-peer-deps --no-audit --no-fund
  touch "$NPM_STAMP"
fi

sh docker/setup-public-path.sh
sh docker/setup-storage-link.sh
sh docker/ensure-frontend-assets.sh

exec "$@"
