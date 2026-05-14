import { showBadge } from "./badge.js";
import { copyToClipboardInTab } from "./clipboard.js";
import { getCurrentVideoTime } from "./player.js";
import { toCleanYouTubeUrl, toCleanYouTubeUrlWithTimestamp } from "./youtube.js";

const COMMAND_COPY_CLEAN_URL = "copy-clean-youtube-url";
const COMMAND_COPY_CLEAN_URL_WITH_TS = "copy-clean-youtube-url-with-timestamp";

chrome.commands.onCommand.addListener((command) => {
  if (command === COMMAND_COPY_CLEAN_URL) {
    void copyCleanUrlFromCurrentTab(false);
  } else if (command === COMMAND_COPY_CLEAN_URL_WITH_TS) {
    void copyCleanUrlFromCurrentTab(true);
  }
});

chrome.action.onClicked.addListener(() => {
  void copyCleanUrlFromCurrentTab(false);
});

async function copyCleanUrlFromCurrentTab(includeTimestamp: boolean): Promise<void> {
  try {
    const tab = await getCurrentTab();

    if (!tab?.id || !tab.url) {
      await showBadge("ERR");
      return;
    }

    let cleanUrl: string | null;

    if (includeTimestamp) {
      const currentTime = await getCurrentVideoTime(tab.id);

      if (currentTime !== null) {
        const baseUrl = toCleanYouTubeUrl(tab.url);

        if (!baseUrl) {
          await showBadge("NO");
          return;
        }

        cleanUrl = `${baseUrl}?t=${currentTime}`;
      } else {
        cleanUrl = toCleanYouTubeUrlWithTimestamp(tab.url);
      }
    } else {
      cleanUrl = toCleanYouTubeUrl(tab.url);
    }

    if (!cleanUrl) {
      await showBadge("NO");
      return;
    }

    const copied = await copyToClipboardInTab(tab.id, cleanUrl);

    await showBadge(copied ? "OK" : "ERR");
  } catch (error) {
    console.error("[youtube-clean-url]", error);
    await showBadge("ERR");
  }
}

async function getCurrentTab(): Promise<chrome.tabs.Tab | undefined> {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  return tab;
}
