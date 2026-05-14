let clearTimer: ReturnType<typeof setTimeout> | undefined;

export type BadgeState = "OK" | "NO" | "ERR";

export async function showBadge(text: BadgeState): Promise<void> {
  clearTimeout(clearTimer);
  await chrome.action.setBadgeText({ text });

  clearTimer = setTimeout(() => {
    void chrome.action.setBadgeText({ text: "" });
  }, 1200);
}
