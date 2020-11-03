#!/usr/bin/env sh
set -euo pipefail

wl-clipboard-history -p "$(wl-clipboard-history -l 10 | fzf --with-nth 2.. -d , | cut -d ',' -f1)"
