import { showBadge } from "./badge.js";
import { copyToClipboardInTab } from "./clipboard.js";
import { toCleanYouTubeUrl } from "./youtube.js";

const COMMAND_COPY_CLEAN_URL = "copy-clean-youtube-url";

chrome.commands.onCommand.addListener((command) => {
  if (command === COMMAND_COPY_CLEAN_URL) {
    void copyCleanUrlFromCurrentTab();
  }
});

chrome.action.onClicked.addListener(() => {
  void copyCleanUrlFromCurrentTab();
});

async function copyCleanUrlFromCurrentTab(): Promise<void> {
  try {
    const tab = await getCurrentTab();

    if (!tab?.id || !tab.url) {
      await showBadge("ERR");
      return;
    }

    const cleanUrl = toCleanYouTubeUrl(tab.url);

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
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  return tabs[0];
}
