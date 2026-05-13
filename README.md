# YouTube Clean URL

Tiny Chromium extension that copies clean YouTube URLs with `Ctrl + Shift + Y`.

## What it does

It converts messy YouTube links into clean short links.

### Input

```txt
https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=abc&index=1
```

### Output

```txt
https://youtu.be/dQw4w9WgXcQ
```

## Supported URLs

- `youtube.com/watch?v=VIDEO_ID`
- `youtube.com/shorts/VIDEO_ID`
- `youtube.com/embed/VIDEO_ID`
- `youtube.com/live/VIDEO_ID`
- `youtu.be/VIDEO_ID`

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

## Shortcut

Default shortcut:

```txt
Ctrl + Shift + Y
```

To change it, open:

```txt
chrome://extensions/shortcuts
```

## Development

After changing the code:

```bash
npm run build
```

Then reload the extension here:

```txt
chrome://extensions
```

## License

MIT
