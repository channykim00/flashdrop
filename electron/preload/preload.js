import { contextBridge, ipcRenderer } from "electron";
import Store from "electron-store";

const store = new Store();

contextBridge.exposeInMainWorld("api", {
  selectFolder: () => ipcRenderer.invoke("select-folder"),
  getDeviceId: () => ipcRenderer.invoke("get-device-id"),
  saveLinkData: (linkData) => ipcRenderer.invoke("save-link-data", linkData),
  getLinkByUniqueUrl: (uniqueUrl) => ipcRenderer.invoke("get-link-by-url", uniqueUrl),
  openFolder: (path) => ipcRenderer.invoke("open-folder", path),
  saveFile: (data) => ipcRenderer.invoke("save-file", data),

  onShowUploadAccept: (callback) => ipcRenderer.on("show-upload-accept", callback),
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
