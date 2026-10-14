#!/bin/sh
set -e

UPLOAD_DIR="${UPLOAD_DIR:-/app/uploads}"
mkdir -p "$UPLOAD_DIR"
chown -R node:node "$UPLOAD_DIR"

exec su-exec node "$@"
