import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ErrorModal from "@/components/ErrorModal";
import Loading from "@/components/Loading";
import FolderPathDisplay from "@/pages/ReceiveFile/FolderPathDisplay";
import LinkGenerator from "@/pages/ReceiveFile/LinkGenerator";
import LinkSettings from "@/pages/ReceiveFile/LinkSettings";
import SecuritySettings from "@/pages/ReceiveFile/SecuritySettings";

const ReceiveFile = () => {
  const navigate = useNavigate();

  const [folderPath, setFolderPath] = useState(null);
  const [error, setError] = useState(null);
  const [linkSettings, setLinkSettings] = useState({
    expireTime: "60",
    allowedFileTypes: "all",
    maxFileSize: "2GB",
    autoAccept: false,
  });
  const [securitySettings, setSecuritySettings] = useState({
    requireSenderName: false,
    password: "",
  });

  useEffect(() => {
    openFolderSelectDialog();
  }, []);

  const openFolderSelectDialog = async () => {
    try {
      const path = await window.api.selectFolder();
      if (path) {
        setFolderPath(path);
      } else {
        navigate(-1);
      }
    } catch (err) {
      setError(err.message || "폴더를 여는 중 문제가 발생했습니다.");
    }
  };

  const handleChangePath = () => {
    openFolderSelectDialog();
  };

  const handleCopyLink = () => {
    console.log("링크가 복사되었습니다.");
  };

  return (
    <>
      {error && (
        <ErrorModal
          errorTitle="폴더 선택 중 오류"
          errorMessage={error}
          onClose={() => setError(null)}
        />
      )}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">파일 받기 링크 생성</h1>

        <section className="mt-6">
          {folderPath ? (
            <div className="rounded-lg bg-white p-4 shadow">
              <LinkGenerator onCopy={handleCopyLink} />

              <hr className="my-6 border-t border-gray-200" />

              <FolderPathDisplay
                folderPath={folderPath}
                onChangePath={handleChangePath}
              />

              <LinkSettings
                settings={linkSettings}
                onChange={setLinkSettings}
              />

              <SecuritySettings
                settings={securitySettings}
                onChange={setSecuritySettings}
              />
            </div>
          ) : (
            <Loading />
          )}
        </section>
      </div>
    </>
  );
};

export default ReceiveFile;
