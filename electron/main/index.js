import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { app, BrowserWindow, ipcMain, dialog, shell } from "electron";
import { io } from "socket.io-client";

import { API_URL, DEV_SERVER_URL } from "../../src/constants.js";
import downloadStore from "../utils/downloadStore.js";
import { isDev } from "../utils/isDev.js";
import uploadRequestStore from "../utils/uploadRequestStore.js";

import { getOrCreateDeviceId } from "./deviceId.js";
import { handleChunkReceive } from "./handlers/fileReceiver.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    minWidth: 750,
    minHeight: 400,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  const socket = io(API_URL);

  socket.on("connect", () => {
    const deviceId = getOrCreateDeviceId();
    socket.emit("register-device", deviceId);
  });

  socket.on("connect_error", (err) => {
    console.error("소켓 연결 오류:", err.message);
  });

  socket.on("receive-chunk", (data) => {
    handleChunkReceive(data);
  });

  socket.on("request-upload-accept", async (data) => {
    if (data.autoAccept === true) {
      mainWindow.webContents.send("auto-accept-upload", data);
      socket.emit("accept-upload", { uploadData: data });
      return;
    }
    const requests = uploadRequestStore.get("uploadRequests") || [];
    requests.push(data);
    uploadRequestStore.set("uploadRequests", requests);

    mainWindow.webContents.send("show-upload-accept", data);
  });
  ipcMain.on("accept-upload", (event, { uploadData }) => {
    socket.emit("accept-upload", { uploadData });
  });

  ipcMain.handle("get-upload-requests", () => {
    return uploadRequestStore.get("uploadRequests") || [];
  });
  ipcMain.handle("set-upload-requests", (event, requests) => {
    uploadRequestStore.set("uploadRequests", requests);
  });

  if (isDev()) {
    mainWindow.loadURL(DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist/index.html"));
  }

  ipcMain.handle("select-folder", async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"],
    });

    if (result.canceled) return null;
    return result.filePaths[0];
  });

  ipcMain.handle("get-device-id", () => {
    return getOrCreateDeviceId();
  });
  ipcMain.handle("save-link-data", async (event, linkData) => {
    try {
      const userDataPath = app.getPath("userData");
      const filePath = path.join(userDataPath, "links.json");

      let existingLinks = [];

      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        existingLinks = JSON.parse(raw);
      }

      existingLinks.push(linkData);

      fs.writeFileSync(filePath, JSON.stringify(existingLinks, null, 2), "utf-8");

      return { success: true };
    } catch (err) {
      console.error("로컬 저장 실패:", err);
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle("get-link-by-url", async (event, uniqueUrl) => {
    const filePath = path.join(app.getPath("userData"), "links.json");
    if (!fs.existsSync(filePath)) return null;

    const all = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return all.find((link) => link.uniqueUrl === uniqueUrl) || null;
  });

  ipcMain.handle("open-folder", async (event, folderPath) => {
    try {
      const result = await shell.openPath(folderPath);
      if (result) throw new Error(result);
      return { success: true };
    } catch (err) {
      console.error("폴더 열기 실패:", err);
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle("save-file", async (event, { fileName, fileData, folderPath }) => {
    try {
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      const filePath = path.join(folderPath, fileName);
      const buffer = Buffer.from(fileData);

      await fs.promises.writeFile(filePath, buffer);

      return { success: true };
    } catch (err) {
      console.error("파일 저장 실패:", err);
      throw err;
    }
  });

  ipcMain.handle("get-download-history", () => {
    const history = downloadStore.get("downloadedFiles") || [];
    return history;
  });
  ipcMain.handle("delete-download-history", (event, fileId) => {
    const files = downloadStore.get("downloadedFiles") || [];

    const updated = files.filter((f) => f.fileId !== fileId);
    downloadStore.set("downloadedFiles", updated);

    return true;
  });
});
