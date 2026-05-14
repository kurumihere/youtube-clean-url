export async function getCurrentVideoTime(tabId: number): Promise<number | null> {
  try {
    const [result] = await chrome.scripting.executeScript({
      target: { tabId },
      func: (): number | null => {
        const video = document.querySelector("video");

        if (!video || video.readyState < 1) {
          return null;
        }

        const time = Math.floor(video.currentTime);

        return time > 0 ? time : null;
      },
    });

    return result?.result ?? null;
  } catch {
    return null;
  }
}
