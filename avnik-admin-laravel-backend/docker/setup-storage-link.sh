#!/bin/sh
set -e

cd "$(dirname "$0")/../public"

# Uploaded files live in storage/uploads/ and are served at /storage/uploads/...
# public/storage must be a symlink to ../storage (not a stale file from local XAMPP).
if [ -L storage ]; then
  target=$(readlink storage)
  case "$target" in
    ../storage|../storage/|/app/storage|/app/storage/)
      exit 0
      ;;
  esac
  echo "[laravel-backend] replacing invalid public/storage symlink..."
  rm -f storage
elif [ -e storage ]; then
  echo "[laravel-backend] replacing stale public/storage file..."
  rm -f storage
fi

ln -sfn ../storage storage
echo "[laravel-backend] linked public/storage -> storage"
