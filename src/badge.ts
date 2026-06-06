import { extensionApi } from "./webextension.js";

let clearTimer: ReturnType<typeof setTimeout> | undefined;

export type BadgeState = "OK" | "NO" | "ERR";

export async function showBadge(text: BadgeState): Promise<void> {
  clearTimeout(clearTimer);
  await extensionApi.action.setBadgeText({ text });

  clearTimer = setTimeout(() => {
    void extensionApi.action.setBadgeText({ text: "" });
  }, 1200);
}
