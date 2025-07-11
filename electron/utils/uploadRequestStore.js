import Store from "electron-store";

const uploadRequestStore = new Store({
  name: "upload-requests",
  defaults: {
    uploadRequests: [],
  },
});

export default uploadRequestStore;
