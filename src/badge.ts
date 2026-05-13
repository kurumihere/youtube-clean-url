export type BadgeState = "OK" | "NO" | "ERR";

export async function showBadge(text: BadgeState): Promise<void> {
  await chrome.action.setBadgeText({ text });

  setTimeout(() => {
    void chrome.action.setBadgeText({ text: "" });
  }, 1200);
}
