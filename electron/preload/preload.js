import { contextBridge, ipcRenderer } from "electron";

import store from "../utils/store.js";

contextBridge.exposeInMainWorld("api", {
  selectFolder: () => ipcRenderer.invoke("select-folder"),
  getDeviceId: () => ipcRenderer.invoke("get-device-id"),
  saveLinkData: (linkData) => ipcRenderer.invoke("save-link-data", linkData),
  getLinkByUniqueUrl: (uniqueUrl) => ipcRenderer.invoke("get-link-by-url", uniqueUrl),
  openFolder: (path) => ipcRenderer.invoke("open-folder", path),

  getLinkList: () => ipcRenderer.invoke("get-link-list"),
  deleteLinkByUrl: (uniqueUrl) => ipcRenderer.invoke("delete-link-by-url", uniqueUrl),

  getDownloadHistory: () => ipcRenderer.invoke("get-download-history"),
  deleteDownloadHistory: (fileId) => ipcRenderer.invoke("delete-download-history", fileId),

  onAutoAcceptUpload: (callback) => ipcRenderer.on("auto-accept-upload", callback),
  onShowUploadAccept: (callback) => ipcRenderer.on("show-upload-accept", callback),

  offAutoAcceptUpload: (callback) => ipcRenderer.removeListener("auto-accept-upload", callback),
  offShowUploadAccept: (callback) => ipcRenderer.removeListener("show-upload-accept", callback),

  sendAcceptedUpload: (uploadData) => ipcRenderer.send("accept-upload", { uploadData }),

  getUploadRequests: () => ipcRenderer.invoke("get-upload-requests"),
  setUploadRequests: (requests) => ipcRenderer.invoke("set-upload-requests", requests),

  store: {
    get: (key) => store.get(key),
    set: (key, value) => store.set(key, value),
    delete: (key) => store.delete(key),
    clear: () => store.clear(),
  },
});
