import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import useDeviceStore from "@/stores/deviceStore";
import useUploadRequestStore from "@/stores/useUploadRequestStore";

const MainLayout = () => {
  const setDeviceId = useDeviceStore((state) => state.setDeviceId);

  const addRequest = useUploadRequestStore((state) => state.addRequest);
  const getLocalRequests = useUploadRequestStore((state) => state.getLocalRequests);

  useEffect(() => {
    getLocalRequests();

    window.api.onShowUploadAccept((event, data) => {
      addRequest(data);
    });
  }, [addRequest, getLocalRequests]);

  useEffect(() => {
    window.api.getDeviceId().then((id) => {
      setDeviceId(id);
    });
  }, [setDeviceId]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
