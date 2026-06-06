import assert from "node:assert/strict";
import test from "node:test";

import {
  toCleanYouTubeUrl,
  toCleanYouTubeUrlWithTimestamp,
} from "../dist/chrome/youtube.js";

const VIDEO_ID = "dQw4w9WgXcQ";
const CLEAN_URL = `https://youtu.be/${VIDEO_ID}`;

test("converts supported YouTube URLs to short clean URLs", () => {
  const cases = [
    `https://www.youtube.com/watch?v=${VIDEO_ID}&list=abc&index=1`,
    `https://youtube.com/watch?v=${VIDEO_ID}`,
    `https://m.youtube.com/watch?v=${VIDEO_ID}`,
    `https://music.youtube.com/watch?v=${VIDEO_ID}`,
    `https://www.youtube.com/shorts/${VIDEO_ID}?feature=share`,
    `https://www.youtube.com/embed/${VIDEO_ID}?start=10`,
    `https://www.youtube.com/live/${VIDEO_ID}?si=abc`,
    `https://youtu.be/${VIDEO_ID}?si=abc`,
  ];

  for (const input of cases) {
    assert.equal(toCleanYouTubeUrl(input), CLEAN_URL, input);
  }
});

test("rejects unsupported or invalid URLs", () => {
  const cases = [
    "not a url",
    "https://example.com/watch?v=dQw4w9WgXcQ",
    "https://youtube.com/watch?v=too-short",
    "https://youtube.com/playlist?list=abc",
    "https://youtu.be/dQw4w9WgXcQ-extra",
  ];

  for (const input of cases) {
    assert.equal(toCleanYouTubeUrl(input), null, input);
  }
});

test("keeps numeric and structured timestamps when present", () => {
  const cases = [
    [`https://youtube.com/watch?v=${VIDEO_ID}&t=90`, `${CLEAN_URL}?t=90`],
    [`https://youtube.com/watch?v=${VIDEO_ID}&t=1m30s`, `${CLEAN_URL}?t=90`],
    [
      `https://youtube.com/watch?v=${VIDEO_ID}&t=1h2m3s`,
      `${CLEAN_URL}?t=3723`,
    ],
    [`https://youtube.com/watch?v=${VIDEO_ID}#t=45s`, `${CLEAN_URL}?t=45`],
  ];

  for (const [input, expected] of cases) {
    assert.equal(toCleanYouTubeUrlWithTimestamp(input), expected, input);
  }
});

test("falls back to clean URL when timestamp is missing or invalid", () => {
  const cases = [
    `https://youtube.com/watch?v=${VIDEO_ID}`,
    `https://youtube.com/watch?v=${VIDEO_ID}&t=0`,
    `https://youtube.com/watch?v=${VIDEO_ID}&t=abc`,
    `https://youtube.com/watch?v=${VIDEO_ID}#not-t=10`,
  ];

  for (const input of cases) {
    assert.equal(toCleanYouTubeUrlWithTimestamp(input), CLEAN_URL, input);
  }
});
