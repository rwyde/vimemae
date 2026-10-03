#!/usr/bin/env bash
set -euo pipefail

required_commands=(grim notify-send npm slurp wl-copy xdg-user-dir)
missing_commands=()

for command in "${required_commands[@]}"; do
  if ! command -v "$command" >/dev/null 2>&1; then
    missing_commands+=("$command")
  fi
done

if ((${#missing_commands[@]})); then
  printf 'Missing required commands: %s\n' "${missing_commands[*]}" >&2
  exit 1
fi

repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bin_dir="$HOME/.local/bin"
mkdir -p "$bin_dir"

memecap_staged="$(mktemp "$bin_dir/.memecap.XXXXXX")"
memeclip_staged="$(mktemp "$bin_dir/.memeclip.XXXXXX")"
cleanup_staged_files() {
  rm -f -- "$memecap_staged" "$memeclip_staged"
}
trap cleanup_staged_files EXIT

install -m755 "$repo_dir/bin/memecap" "$memecap_staged"
install -m755 "$repo_dir/bin/memeclip" "$memeclip_staged"

cd "$repo_dir"
npm ci
npm run build

mv -f -- "$memecap_staged" "$bin_dir/memecap"
mv -f -- "$memeclip_staged" "$bin_dir/memeclip"
trap - EXIT

printf 'Installed Vimemae commands and Vicinae extension.\n'
