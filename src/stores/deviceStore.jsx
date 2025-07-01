import { create } from "zustand";

const useDeviceStore = create((set) => ({
  deviceId: null,
  setDeviceId: (id) => set({ deviceId: id }),
}));

export default useDeviceStore;
