#!/usr/bin/env bash
set -euo pipefail

# Prune target directories as soon as they are found. This avoids traversing
# huge node_modules trees before deleting them.
find . \
  -path './.git' -prune -o \
  -type d \( -name 'node_modules' -o -name 'dist' \) -prune \
  -exec rm -rf {} +

# Uncomment if you also want to remove generated lockfiles.
# find . -name 'pnpm-lock.yaml' -type f -delete
