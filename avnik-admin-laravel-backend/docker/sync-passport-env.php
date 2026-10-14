<?php

/**
 * Sync Passport personal access client credentials between DB and .env.
 * Needed when using an imported database with existing oauth_clients.
 */

$envPath = __DIR__ . '/../.env';

if (!is_readable($envPath)) {
    fwrite(STDERR, "[laravel-backend] .env not found — skipping Passport sync.\n");
    exit(0);
}

require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

function readEnvValue(string $path, string $key): ?string
{
    $lines = file($path, FILE_IGNORE_NEW_LINES);
    $prefix = $key . '=';

    foreach ($lines as $line) {
        if (str_starts_with($line, $prefix)) {
            return substr($line, strlen($prefix));
        }
    }

    return null;
}

function writeEnvValues(string $path, array $values): void
{
    $lines = file($path, FILE_IGNORE_NEW_LINES);
    $updated = [];

    foreach ($lines as $line) {
        $replaced = false;

        foreach ($values as $key => $value) {
            if (str_starts_with($line, $key . '=')) {
                $updated[] = $key . '=' . $value;
                $replaced = true;
                unset($values[$key]);
                break;
            }
        }

        if (!$replaced) {
            $updated[] = $line;
        }
    }

    foreach ($values as $key => $value) {
        $updated[] = $key . '=' . $value;
    }

    file_put_contents($path, implode(PHP_EOL, $updated) . PHP_EOL);
}

function findPersonalAccessClient(): ?object
{
    // Prefer the oauth_clients row flagged as personal_access_client.
    $client = DB::table('oauth_clients')
        ->where('personal_access_client', 1)
        ->where('revoked', 0)
        ->orderByDesc('created_at')
        ->first();

    if ($client) {
        return $client;
    }

    // Fall back to a mapping row whose client still exists.
    $mappings = DB::table('oauth_personal_access_clients')
        ->orderByDesc('id')
        ->get();

    foreach ($mappings as $mapping) {
        $mappedClient = DB::table('oauth_clients')
            ->where('id', $mapping->client_id)
            ->where('revoked', 0)
            ->first();

        if ($mappedClient) {
            return $mappedClient;
        }
    }

    return null;
}

function ensurePersonalAccessMapping(string $clientId): void
{
    $existing = DB::table('oauth_personal_access_clients')
        ->where('client_id', $clientId)
        ->exists();

    if ($existing) {
        return;
    }

    DB::table('oauth_personal_access_clients')->insert([
        'client_id' => $clientId,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    echo "[laravel-backend] created missing oauth_personal_access_clients mapping.\n";
}

try {
    $clientCount = (int) DB::table('oauth_clients')->count();
} catch (Throwable $e) {
    fwrite(STDERR, "[laravel-backend] Passport tables unavailable — skipping sync.\n");
    exit(0);
}

if ($clientCount === 0) {
    echo "[laravel-backend] no OAuth clients found — run passport:install.\n";
    exit(2);
}

$client = findPersonalAccessClient();

if (!$client) {
    echo "[laravel-backend] no valid personal access client found — run passport:install.\n";
    exit(2);
}

ensurePersonalAccessMapping($client->id);

$envClientId = readEnvValue($envPath, 'PASSPORT_PERSONAL_ACCESS_CLIENT_ID');
$envClientSecret = readEnvValue($envPath, 'PASSPORT_PERSONAL_ACCESS_CLIENT_SECRET');

$envClientExists = $envClientId
    && DB::table('oauth_clients')->where('id', $envClientId)->where('revoked', 0)->exists();

$secretValid = $envClientSecret && Hash::check($envClientSecret, $client->secret);
$idValid = $envClientId === $client->id && $envClientExists;

if ($idValid && $secretValid) {
    echo "[laravel-backend] Passport credentials already in sync (client {$client->id}).\n";
    exit(0);
}

if ($envClientId && !$envClientExists) {
    echo "[laravel-backend] stale PASSPORT_PERSONAL_ACCESS_CLIENT_ID in .env — fixing.\n";
}

$newSecret = $envClientSecret && strlen($envClientSecret) >= 20 ? $envClientSecret : Str::random(40);

if (!$secretValid) {
    DB::table('oauth_clients')->where('id', $client->id)->update([
        'secret' => Hash::make($newSecret),
    ]);
    echo "[laravel-backend] regenerated Passport client secret for imported database.\n";
}

writeEnvValues($envPath, [
    'PASSPORT_PERSONAL_ACCESS_CLIENT_ID' => $client->id,
    'PASSPORT_PERSONAL_ACCESS_CLIENT_SECRET' => $newSecret,
]);

echo "[laravel-backend] synced Passport credentials to .env (client {$client->id}).\n";
exit(0);
