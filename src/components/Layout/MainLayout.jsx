import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import useDeviceStore from "@/stores/deviceStore";
import useUploadRequestStore from "@/stores/useUploadRequestStore";
import showNotification from "@/utils/showNotification.js";

const MainLayout = () => {
  const navigate = useNavigate();
  const setDeviceId = useDeviceStore((state) => state.setDeviceId);

  const addRequest = useUploadRequestStore((state) => state.addRequest);
  const getLocalRequests = useUploadRequestStore((state) => state.getLocalRequests);

  useEffect(() => {
    getLocalRequests();

    window.api.onShowUploadAccept((event, data) => {
      showNotification("FlashDrop 알림", "새로운 파일이 도착했습니다.", () => {
        navigate("/fileRequest");
      });
      addRequest(data);
    });
    window.api.onAutoAcceptUpload((event, data) => {
      showNotification("다운로드 진행중", `${data.filename}을 다운로드 중입니다.`, () => {
        navigate("/fileRequest");
      });
    });
  }, [addRequest, getLocalRequests, navigate]);

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
