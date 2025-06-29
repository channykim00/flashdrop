import { IoSettings } from "react-icons/io5";
import { RiFolderDownloadFill } from "react-icons/ri";
import { RiFolderUploadFill } from "react-icons/ri";
import { TbBinaryTree2 } from "react-icons/tb";
import logo from "@/assets/logo.png";

const Sidebar = () => {
  return (
    <div className="w-48 flex-col border-r border-gray-200 bg-white shadow-sm md:flex">
      <div className="flex flex-1 flex-col">
        <nav className="flex flex-1 flex-col gap-10 rounded-2xl px-2 py-4">
          <div className="py-2.5">
            <a
              href="#"
              className="flex items-center px-4 text-gray-100"
              draggable="false"
            >
              <img
                src={logo}
                alt="Flash Drop Logo"
                className="h-auto w-auto"
                draggable="false"
              />
            </a>
          </div>

          <div className="flex flex-1 flex-col justify-between text-sm">
            <div className="mt-2 flex flex-col gap-3">
              <a
                href="#"
                className="sidebar-link"
              >
                <RiFolderDownloadFill className="mr-3 text-xl" /> 받은 파일 목록
              </a>
              <a
                href="#"
                className="sidebar-link"
              >
                <RiFolderUploadFill className="mr-3 text-xl" /> 보낸 파일 목록
              </a>
              <a
                href="#"
                className="sidebar-link"
              >
                <TbBinaryTree2 className="mr-3 text-xl" /> 링크 관리
              </a>
            </div>
            <div className="mt-4 border-t border-gray-200 px-1 pt-3">
              <a
                href="#"
                className="sidebar-link"
              >
                <IoSettings className="mr-3 text-xl" /> 설정
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
