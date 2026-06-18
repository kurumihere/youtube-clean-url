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

## Shortcuts

| Browser | Clean URL | Clean URL with timestamp |
|---|---:|---:|
| Chrome/Chromium | `Ctrl + Shift + Y` | `Ctrl + Shift + U` |
| Firefox | `Ctrl + Alt + Y` | `Ctrl + Alt + U` |
> *The toolbar icon copies a clean URL without timestamp.*

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
> Or just install [*this*](https://addons.mozilla.org/en-US/firefox/addon/youtube-clean-url/)

Shortcut settings:

- Chrome/Chromium: `chrome://extensions/shortcuts`
- Firefox: `about:addons` -> gear icon -> **Manage Extension Shortcuts**

## Supported URLs

- `youtube.com/watch?v=VIDEO_ID`
- `youtube.com/shorts/VIDEO_ID`
- `youtube.com/embed/VIDEO_ID`
- `youtube.com/live/VIDEO_ID`
- `youtu.be/VIDEO_ID`
- `music.youtube.com/watch?v=VIDEO_ID`
