# Vimemae

A small [Vicinae](https://vicinae.com/) extension with two Wayland screenshot commands:

- **Memeclip** selects a region and copies the screenshot to the clipboard.
- **Memecap** selects a region, saves it under `~/pic`, and copies it to the clipboard.

## Requirements

- Vicinae
- Node.js and npm
- `grim`
- `slurp`
- `wl-clipboard`
- `libnotify`

On Arch Linux:

```bash
sudo pacman -S grim slurp wl-clipboard libnotify nodejs npm
```

## Install

```bash
git clone https://github.com/rwyde/vimemae.git
cd vimemae
./install.sh
```

The installer places the helper commands in `~/.local/bin` and builds the extension into Vicinae's user extension directory. Ensure `~/.local/bin` is in the environment used to launch Vicinae.

## Development

```bash
npm ci
npm run dev
```

## License

MIT
