# Walker v2 for Linux

Unofficial Linux repack of **Walker v2 1.0.4** by SDCX, the configurator for the 36ae:fe9c keyboard / macropad.

The original Windows app is Electron + WebHID with no native code. This repo just rebuilds it with Linux Electron (30.5.1, same version as the original). No functional changes.

## Install

Download from [Releases](../../releases):

- `Walker-v2-1.0.4-linux-x86_64.AppImage`: `chmod +x` it and run.
- `Walker-v2-1.0.4-linux-x64.tar.gz`: extract it and run `walker-v2`.

### Required: USB permission (udev)

```bash
sudo cp 70-walker.rules /etc/udev/rules.d/
sudo udevadm control --reload && sudo udevadm trigger
```

Unplug and replug the device afterwards.

## Build it yourself

```bash
cd app && npm install && npm run dist
```

## Disclaimer

All application code, assets and firmware belong to SDCX (the package declares MIT). This is an unofficial repack, so use firmware flashing at your own risk.
