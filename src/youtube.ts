const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "m.youtube.com",
  "music.youtube.com",
  "youtu.be",
]);

export function toCleanYouTubeUrl(input: string): string | null {
  const url = parseUrl(input);

  if (!url) {
    return null;
  }

  const hostname = normalizeHostname(url.hostname);

  if (!YOUTUBE_HOSTS.has(hostname)) {
    return null;
  }

  const videoId = extractVideoId(url, hostname);

  if (!videoId) {
    return null;
  }

  return `https://youtu.be/${videoId}`;
}

export function toCleanYouTubeUrlWithTimestamp(input: string): string | null {
  const url = parseUrl(input);

  if (!url) {
    return null;
  }

  const hostname = normalizeHostname(url.hostname);

  if (!YOUTUBE_HOSTS.has(hostname)) {
    return null;
  }

  const videoId = extractVideoId(url, hostname);

  if (!videoId) {
    return null;
  }

  const timestamp = extractTimestamp(url);

  if (timestamp !== null) {
    return `https://youtu.be/${videoId}?t=${timestamp}`;
  }

  return `https://youtu.be/${videoId}`;
}

function parseUrl(input: string): URL | null {
  try {
    return new URL(input);
  } catch {
    return null;
  }
}

function normalizeHostname(hostname: string): string {
  return hostname.toLowerCase().replace(/^www\./, "");
}

function extractVideoId(url: URL, hostname: string): string | null {
  if (hostname === "youtu.be") {
    return cleanVideoId(url.pathname.split("/").filter(Boolean)[0]);
  }

  return (
    extractWatchVideoId(url) ??
    extractPathVideoId(url, "/shorts/") ??
    extractPathVideoId(url, "/embed/") ??
    extractPathVideoId(url, "/live/")
  );
}

function extractWatchVideoId(url: URL): string | null {
  if (url.pathname !== "/watch") {
    return null;
  }

  return cleanVideoId(url.searchParams.get("v"));
}

function extractPathVideoId(url: URL, prefix: string): string | null {
  if (!url.pathname.startsWith(prefix)) {
    return null;
  }

  return cleanVideoId(url.pathname.slice(prefix.length).split("/")[0]);
}

function cleanVideoId(videoId: string | null | undefined): string | null {
  if (!videoId) {
    return null;
  }

  const trimmed = videoId.trim();

  if (!/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return null;
  }

  return trimmed;
}

function extractTimestamp(url: URL): number | null {
  const t = url.searchParams.get("t");

  if (t) {
    const seconds = parseTimestamp(t);

    if (seconds !== null) {
      return seconds;
    }
  }

  const hash = url.hash.replace(/^#/, "");

  if (hash.startsWith("t=")) {
    return parseTimestamp(hash.slice(2));
  }

  return null;
}

function parseTimestamp(value: string): number | null {
  if (/^\d+$/.test(value)) {
    const seconds = Number.parseInt(value, 10);

    return seconds > 0 ? seconds : null;
  }

  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);

  if (!match) {
    return null;
  }

  const hours = match[1] ? Number.parseInt(match[1], 10) : 0;
  const minutes = match[2] ? Number.parseInt(match[2], 10) : 0;
  const seconds = match[3] ? Number.parseInt(match[3], 10) : 0;
  const total = hours * 3600 + minutes * 60 + seconds;

  return total > 0 ? total : null;
}
