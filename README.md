# YouTube Clean URL

Tiny Chromium extension that copies clean YouTube URLs.

## What it does

Converts messy YouTube links into clean short links, optionally with the current playback timestamp.

### Without timestamp (`Ctrl + Shift + Y` or click toolbar icon)

```
Input:  https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=abc&index=1
Output: https://youtu.be/dQw4w9WgXcQ
```

### With current playback timestamp (`Ctrl + Shift + U`)

```
Input:  https://www.youtube.com/watch?v=dQw4w9WgXcQ
Action: press shortcut at 1:30 into the video
Output: https://youtu.be/dQw4w9WgXcQ?t=90
```

The timestamp is read directly from the video player — it's your actual playback position, not a URL parameter.

## Supported URLs

- `youtube.com/watch?v=VIDEO_ID`
- `youtube.com/shorts/VIDEO_ID`
- `youtube.com/embed/VIDEO_ID`
- `youtube.com/live/VIDEO_ID`
- `youtu.be/VIDEO_ID`
- `music.youtube.com/watch?v=VIDEO_ID`

## Requirements

- Node.js
- npm
- Chromium-based browser

## Install dependencies

```bash
npm install
```

## Build

```bash
npm run build
```

## Install in Chromium

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `dist` folder

## Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + Shift + Y` | Copy clean URL (without timestamp) |
| `Ctrl + Shift + U` | Copy clean URL with current playback timestamp |

Click the toolbar icon to copy without timestamp.

To change shortcuts, open:

```
chrome://extensions/shortcuts
```

## Development

After changing the code:

```bash
npm run build
```

Then reload the extension here:

```
chrome://extensions
```

## License

MIT
