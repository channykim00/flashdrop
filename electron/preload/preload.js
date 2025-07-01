import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  selectFolder: () => ipcRenderer.invoke("select-folder"),
  getDeviceId: () => ipcRenderer.invoke("get-device-id"),
  saveLinkData: (linkData) => ipcRenderer.invoke("save-link-data", linkData),
  getLinkByUniqueUrl: (uniqueUrl) => ipcRenderer.invoke("get-link-by-url", uniqueUrl),
  openFolder: (path) => ipcRenderer.invoke("open-folder", path),
});
