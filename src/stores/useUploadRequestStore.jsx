import { create } from "zustand";

const useUploadRequestStore = create((set, get) => ({
  requests: [],

  addRequest: (request) => {
    const updatedRequests = [...get().requests, request];
    set({ requests: updatedRequests });
    window.api.setUploadRequests(updatedRequests);
  },

  removeRequest: (fileId) => {
    const updatedRequests = get().requests.filter((r) => r.fileId !== fileId);
    set({ requests: updatedRequests });
    window.api.setUploadRequests(updatedRequests);
  },

  getLocalRequests: async () => {
    const storedRequests = await window.api.getUploadRequests();
    if (Array.isArray(storedRequests)) {
      set({ requests: storedRequests });
    }
  },
}));

export default useUploadRequestStore;
