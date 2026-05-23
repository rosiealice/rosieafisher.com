#!/usr/bin/env bash
set -euo pipefail

# Run Hugo using the repository root as source, regardless of current directory.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec hugo --source "$SCRIPT_DIR" "$@"
