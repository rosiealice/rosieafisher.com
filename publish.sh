#!/usr/bin/env bash
set -euo pipefail

# Commit and push from main; GitHub Actions handles deploy to Pages.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [[ "$(git rev-parse --abbrev-ref HEAD)" != "main" ]]; then
  echo "Error: run this from the main branch."
  exit 1
fi

MESSAGE="${1:-Update site content}"

git add -A

if git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi

git commit -m "$MESSAGE"
git push origin main

echo "Pushed to main. GitHub Actions will deploy to rosieafisher.com."
