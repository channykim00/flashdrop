import { create } from "zustand";

const defaultLinkSettings = {
  expireTime: "60",
  allowedFileTypes: "all",
  maxFileSize: "2GB",
  autoAccept: false,
};

const defaultSecuritySettings = {
  requireSenderName: false,
  password: "",
};

const useLinkStore = create((set) => ({
  folderPath: null,
  linkSettings: { ...defaultLinkSettings },
  securitySettings: { ...defaultSecuritySettings },

  setFolderPath: (path) => set({ folderPath: path }),

  setLinkSettings: (settings) =>
    set((state) => ({
      linkSettings: { ...state.linkSettings, ...settings },
    })),

  setSecuritySettings: (settings) =>
    set((state) => ({
      securitySettings: { ...state.securitySettings, ...settings },
    })),

  setAll: ({ folderPath, linkSettings, securitySettings }) =>
    set({
      folderPath,
      linkSettings: { ...linkSettings },
      securitySettings: { ...securitySettings },
    }),

  reset: () =>
    set({
      folderPath: null,
      linkSettings: { ...defaultLinkSettings },
      securitySettings: { ...defaultSecuritySettings },
    }),
}));

export default useLinkStore;
