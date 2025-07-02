import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import socket from "@/socket/socket";
import useDeviceStore from "@/stores/deviceStore";

const MainLayout = () => {
  const deviceId = useDeviceStore((state) => state.deviceId);
  const setDeviceId = useDeviceStore((state) => state.setDeviceId);

  useEffect(() => {
    window.api.getDeviceId().then((id) => {
      setDeviceId(id);
    });
  }, []);

  useEffect(() => {
    if (!deviceId) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("소켓 연결됨:", socket.id);
      socket.emit("register-device", deviceId);
    });

    socket.on("connect_error", (err) => {
      console.error("소켓 연결 오류:", err.message);
    });

    socket.on("receive-file", ({ fileName, fileData, folderPath }) => {
      window.api
        .saveFile({ fileName, fileData, folderPath })
        .then(() => {
          console.log("파일 저장 성공");
          socket.emit("send-file-success", "파일 저장 성공");
        })
        .catch((err) => {
          console.error("파일 저장 실패:", err);
          socket.emit("send-file-error", "파일 저장 중 오류 발생");
        });
    });

    return () => {
      socket.disconnect();
    };
  }, [deviceId]);

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
