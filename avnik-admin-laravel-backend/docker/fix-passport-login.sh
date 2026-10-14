#!/bin/sh
# Fix POST /api/login returning 500 due to stale Passport OAuth client credentials.
# Run on the server:
#   docker exec avnik-laravel-backend-prod sh /app/docker/fix-passport-login.sh
# Or from the repo root:
#   docker compose -f compose.prod.yaml exec laravel-backend sh /app/docker/fix-passport-login.sh

set -e
cd /app

echo "[laravel-backend] fixing Passport login credentials..."

php -r '
require __DIR__ . "/vendor/autoload.php";
$app = require __DIR__ . "/bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

$envPath = __DIR__ . "/.env";
$lines = file($envPath, FILE_IGNORE_NEW_LINES);
$env = [];
foreach ($lines as $line) {
    if (str_contains($line, "=")) {
        [$k, $v] = explode("=", $line, 2);
        $env[$k] = $v;
    }
}

$client = DB::table("oauth_clients")
    ->where("personal_access_client", 1)
    ->where("revoked", 0)
    ->orderByDesc("created_at")
    ->first();

if (!$client) {
    fwrite(STDERR, "ERROR: no personal access client in oauth_clients table.\n");
    fwrite(STDERR, "Run: php artisan passport:install --force\n");
    exit(1);
}

$secret = $env["PASSPORT_PERSONAL_ACCESS_CLIENT_SECRET"] ?? null;
if (!$secret || !Hash::check($secret, $client->secret)) {
    $secret = Str::random(40);
    DB::table("oauth_clients")->where("id", $client->id)->update([
        "secret" => Hash::make($secret),
    ]);
    echo "Regenerated Passport client secret.\n";
}

$mapping = DB::table("oauth_personal_access_clients")->where("client_id", $client->id)->exists();
if (!$mapping) {
    DB::table("oauth_personal_access_clients")->insert([
        "client_id" => $client->id,
        "created_at" => now(),
        "updated_at" => now(),
    ]);
    echo "Created oauth_personal_access_clients mapping.\n";
}

$out = [];
$foundId = false;
$foundSecret = false;
foreach ($lines as $line) {
    if (str_starts_with($line, "PASSPORT_PERSONAL_ACCESS_CLIENT_ID=")) {
        $out[] = "PASSPORT_PERSONAL_ACCESS_CLIENT_ID=" . $client->id;
        $foundId = true;
    } elseif (str_starts_with($line, "PASSPORT_PERSONAL_ACCESS_CLIENT_SECRET=")) {
        $out[] = "PASSPORT_PERSONAL_ACCESS_CLIENT_SECRET=" . $secret;
        $foundSecret = true;
    } else {
        $out[] = $line;
    }
}
if (!$foundId) {
    $out[] = "PASSPORT_PERSONAL_ACCESS_CLIENT_ID=" . $client->id;
}
if (!$foundSecret) {
    $out[] = "PASSPORT_PERSONAL_ACCESS_CLIENT_SECRET=" . $secret;
}
file_put_contents($envPath, implode(PHP_EOL, $out) . PHP_EOL);

echo "PASSPORT_PERSONAL_ACCESS_CLIENT_ID=" . $client->id . PHP_EOL;
echo "Passport credentials fixed.\n";
'

php artisan config:clear
rm -f bootstrap/cache/config.php bootstrap/cache/routes.php bootstrap/cache/services.php 2>/dev/null || true

echo "[laravel-backend] testing login endpoint..."
HTTP_CODE=$(curl -sf -o /dev/null -w "%{http_code}" -X POST http://127.0.0.1/api/login \
  -H "Content-Type: application/json" \
  -H "X-Forwarded-Proto: https" \
  -d '{"email":"test@example.com","password":"wrong"}' || echo "000")

if [ "$HTTP_CODE" = "500" ]; then
  echo "[laravel-backend] ERROR: login still returns 500. Recent log:"
  tail -20 storage/logs/laravel.log 2>/dev/null || true
  exit 1
fi

echo "[laravel-backend] login endpoint OK (HTTP $HTTP_CODE — auth failure expected for test user)."
echo "[laravel-backend] done — try signing in again in the browser."
