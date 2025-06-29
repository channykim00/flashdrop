import path from "path";

import { app, BrowserWindow } from "electron";

import { isDev } from "../utils/isDev.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    minWidth: 750,
    minHeight: 400,
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist/index.html"));
  }
});
