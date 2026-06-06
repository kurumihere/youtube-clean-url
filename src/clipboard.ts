import { extensionApi } from "./webextension.js";

export async function copyToClipboardInTab(
  tabId: number,
  text: string,
): Promise<boolean> {
  const [result] = await extensionApi.scripting.executeScript({
    target: { tabId },
    args: [text],
    func: async (value: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(value);
        return true;
      } catch {
        const textarea = document.createElement("textarea");

        textarea.value = value;
        textarea.readOnly = true;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        const copied = document.execCommand("copy");

        textarea.remove();

        return copied;
      }
    },
  });

  return result?.result === true;
}
