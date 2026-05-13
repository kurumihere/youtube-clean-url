const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "m.youtube.com",
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

  if (!/^[a-zA-Z0-9_-]{6,}$/.test(trimmed)) {
    return null;
  }

  return trimmed;
}
