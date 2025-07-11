import Store from "electron-store";

const downloadStore = new Store({
  name: "downloadHistory",
});

export default downloadStore;
