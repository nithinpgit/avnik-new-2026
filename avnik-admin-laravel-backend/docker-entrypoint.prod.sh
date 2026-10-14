#!/bin/sh
set -e
cd /app

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

sh docker/render-laravel-env.sh
sh docker/setup-public-path.sh
sh docker/setup-storage-link.sh

mkdir -p storage/framework/sessions storage/framework/views storage/framework/cache storage/logs bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

if [ "${SKIP_MIGRATIONS:-false}" = "true" ]; then
  echo "[laravel-backend] skipping migrations (SKIP_MIGRATIONS=true)"
else
  php artisan migrate --force
fi

if [ ! -f storage/oauth-private.key ] || [ ! -f storage/oauth-public.key ]; then
  echo "[laravel-backend] generating Passport encryption keys..."
  php artisan passport:keys --force
fi
chown www-data:www-data storage/oauth-private.key storage/oauth-public.key 2>/dev/null || true
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
  php artisan passport:install --force
else
  echo "[laravel-backend] OAuth clients found in database."
fi

echo "[laravel-backend] syncing Passport credentials with database..."
if ! php docker/sync-passport-env.php; then
  echo "[laravel-backend] WARNING: Passport sync failed — login API may return 500 until fixed."
fi

php artisan config:clear
php artisan view:clear

php artisan route:clear

php-fpm -D
exec nginx -g 'daemon off;'
