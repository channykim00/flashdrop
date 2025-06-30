import { create } from "zustand";

const useLinkStore = create((set) => ({
  folderPath: null,
  linkSettings: {
    expireTime: "60",
    allowedFileTypes: "all",
    maxFileSize: "2GB",
    autoAccept: false,
  },
  securitySettings: {
    requireSenderName: false,
    password: "",
  },

  setFolderPath: (path) => set({ folderPath: path }),
  setLinkSettings: (settings) => set({ linkSettings: settings }),
  setSecuritySettings: (settings) => set({ securitySettings: settings }),

  setAll: ({ folderPath, linkSettings, securitySettings }) =>
    set({ folderPath, linkSettings, securitySettings }),
}));

export default useLinkStore;
