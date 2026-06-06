declare const browser: typeof chrome | undefined;

export const extensionApi: typeof chrome =
  typeof browser === "undefined" ? chrome : browser;
