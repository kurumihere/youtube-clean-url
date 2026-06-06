<p align="center">
  <img src="assets/icon.svg" alt="YouTube Clean URL icon" width="96" height="96">
</p>

# YouTube Clean URL

Chrome and Firefox extension for copying clean YouTube links.

```text
https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=abc&index=1
-> https://youtu.be/dQw4w9WgXcQ
```

With timestamp:

```text
https://www.youtube.com/watch?v=dQw4w9WgXcQ
-> https://youtu.be/dQw4w9WgXcQ?t=90
```

The timestamp command reads the actual player time, not just the URL query.

## Shortcuts

| Browser | Clean URL | Clean URL with timestamp |
|---|---:|---:|
| Chrome/Chromium | `Ctrl + Shift + Y` | `Ctrl + Shift + U` |
| Firefox | `Ctrl + Alt + Y` | `Ctrl + Alt + U` |

The toolbar icon copies a clean URL without timestamp.

## Install Locally

```bash
npm install
npm run build
```

Chrome/Chromium:

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select `dist/chrome`

Firefox 142+:

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on...**
3. Select `dist/firefox/manifest.json`

Shortcut settings:

- Chrome/Chromium: `chrome://extensions/shortcuts`
- Firefox: `about:addons` -> gear icon -> **Manage Extension Shortcuts**

## Commands

| Command | Purpose |
|---|---|
| `npm run build` | Build Chrome and Firefox extensions into `dist/` |
| `npm run check` | Run TypeScript, URL parser tests, and Firefox lint |
| `npm run package` | Create store-ready zip files in `packages/` |

Package output:

- `packages/youtube-clean-url-chrome-v1.0.0.zip`
- `packages/youtube-clean-url-firefox-v1.0.0.zip`

## Supported URLs

- `youtube.com/watch?v=VIDEO_ID`
- `youtube.com/shorts/VIDEO_ID`
- `youtube.com/embed/VIDEO_ID`
- `youtube.com/live/VIDEO_ID`
- `youtu.be/VIDEO_ID`
- `music.youtube.com/watch?v=VIDEO_ID`

## License

MIT
