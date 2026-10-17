# Walker v2 for Linux

Unofficial Linux repack of **Walker v2 1.0.4** by SDCX, the configurator for the **SDCINNOVATION Gaming Keyboard** (USB `36ae:fe9c`, 61-key / 60%).

The original Windows app is Electron + WebHID with no native code. This repo rebuilds it with Linux Electron 30.5.1 (the same version as the original), with no functional changes. Tested on CachyOS (Arch).

## 1. Install

Download from [Releases](../../releases):

- **AppImage** (recommended): `Walker-v2-1.0.4-linux-x86_64.AppImage`
- **tar.gz**: extract it and run `walker-v2`

### Add it to your launcher menu (AppImage)

```bash
mkdir -p ~/Applications ~/.local/share/applications
mv Walker-v2-1.0.4-linux-x86_64.AppImage ~/Applications/Walker-v2.AppImage
chmod +x ~/Applications/Walker-v2.AppImage
cat > ~/.local/share/applications/walker-v2.desktop <<EOF
[Desktop Entry]
Type=Application
Name=Walker v2
Comment=SDCX keyboard configurator
Exec=$HOME/Applications/Walker-v2.AppImage %U
Icon=walker-v2
Terminal=false
Categories=Utility;
EOF
```

Optional icon: `cp app/main/assets/icon.png ~/.local/share/icons/hicolor/512x512/apps/walker-v2.png`

## 2. USB permission (required)

Without this, the app opens but can't talk to the keyboard. Run each command separately (fish users: don't paste them as one line):

```bash
sudo cp 70-walker.rules /etc/udev/rules.d/
sudo udevadm control --reload
sudo udevadm trigger
```

Then **unplug and replug** the keyboard and restart the app.

> The file **must** start with a number below `73` (e.g. `70-`). `uaccess` is applied by systemd's `73-seat-late.rules`, so a `99-` rule sets the mode but never grants your user access.

Check that it worked:

```bash
getfacl /dev/hidraw* 2>/dev/null | grep -B3 "user:$USER"
```

## 3. Usage

- At the top, **My device: SDCINNOVATION Gaming Keyboard** means it's connected.
- The **top keyboard** is *your* keyboard (61-key layout, loaded from the device).
- The **bottom keyboard** is only a **key picker**: every key you can assign, which is why it's bigger than a 60%. Clicking it doesn't type anything.

**Remap a key:**
1. Click a key on the **top** keyboard (e.g. `Caps`).
2. Click the new function on the **bottom** picker (e.g. `Esc`), or use the Media / Shortcut / Macro tabs.
3. Press the physical key to check.

Use **Main Layer / Fn Layer** (right side) to edit what keys do while holding FN. **Lighting**, **Macro** and **Setting** are in the left menu.

## Troubleshooting

| Problem | Fix |
|---|---|
| White screen | Use release v1.0.4 (re-uploaded). The first build was missing `build/`. |
| App doesn't respond / keyboard not found | Install the udev rule (section 2), replug, restart the app. |
| Shows a big keyboard | That's the key picker. Your keyboard is the top one. |
| Debug | Run `~/Applications/Walker-v2.AppImage --enable-logging=stderr` |

## Build it yourself

```bash
cd app && npm install && npm run dist   # output in ../dist
```

Note: `package.json` sets `directories.buildResources` to `buildres`, because electron-builder otherwise excludes the app's `build/` folder (the UI).

## How this was made

1. Extracted the NSIS installer (`Walker v2 Setup 1.0.4.exe`) with `bsdtar`.
2. Extracted `resources/app.asar` with `npx @electron/asar extract`.
3. Found plain JS + a Next.js static export with WebHID access and no Windows-only code.
4. Repackaged with electron-builder for Linux (AppImage + tar.gz).

## Disclaimer

All application code, assets and firmware belong to SDCX (the package declares MIT). This is an unofficial repack. Firmware flashing is at your own risk.
