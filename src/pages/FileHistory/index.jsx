import { useEffect, useState } from "react";
import DeletePrompt from "@/components/DeletePrompt";
import dateFormat from "@/utils/dateFormat";
import formatFileSize from "@/utils/formatFileSize";

const FileHistory = () => {
  const [files, setFiles] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [targetFile, setTargetFile] = useState(null);

  useEffect(() => {
    async function fetchHistory() {
      const history = await window.api.getDownloadHistory();
      setFiles(history);
    }
    fetchHistory();
  }, []);

  const handleDelete = async () => {
    if (!targetFile) return;

    await window.api.deleteDownloadHistory(targetFile.fileId);
    setFiles((prev) => prev.filter((f) => f.fileId !== targetFile.fileId));
    setIsDeleteOpen(false);
    setTargetFile(null);
  };

  return (
    <div className="mx-auto p-6">
      {isDeleteOpen && (
        <DeletePrompt
          title="파일 기록 삭제"
          message={`"${targetFile?.originalFilename}" 파일 기록을 삭제하시겠습니까?`}
          onCancel={() => {
            setIsDeleteOpen(false);
            setTargetFile(null);
          }}
          onDelete={handleDelete}
        />
      )}
      <h1 className="mb-6 text-2xl font-bold text-gray-800">받은 파일 기록</h1>

      <section className="mb-6">
        <div className="rounded-lg bg-white p-5 shadow">
          <div className="overflow-x-auto rounded-lg bg-white shadow-md">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-100 text-xs tracking-wider text-gray-500 uppercase">
                <tr className="text-center">
                  <th className="px-3 py-3">보낸이</th>
                  <th className="px-3 py-3">파일명</th>
                  <th className="px-3 py-3">크기</th>
                  <th className="px-3 py-3">저장 위치</th>
                  <th className="px-3 py-3">받은 시간</th>
                  <th className="px-3 py-3">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-center">
                {files.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-4"
                    >
                      받은 파일 기록이 없습니다.
                    </td>
                  </tr>
                )}
                {files.map((file) => (
                  <tr key={file.fileId}>
                    <td className="px-3 py-2">
                      {file.senderName ? (
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                          {file.senderName}
                        </span>
                      ) : (
                        <span className="me-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          없음
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2">{file.originalFilename}</td>
                    <td className="px-3 py-2">{formatFileSize(file.size)}</td>
                    <td className="px-3 py-2 text-xs">{file.savedDirectory}</td>
                    <td className="px-3 py-2 text-xs">{dateFormat(file.downloadTime)}</td>
                    <td className="px-3 py-2">
                      <button
                        className="bg-dodger-blue-600 hover:bg-dodger-blue-700 cursor-pointer rounded-lg px-3 py-1 text-xs font-medium text-white focus:ring-2 focus:ring-[color:var(--color-dodger-blue-300)] focus:outline-none"
                        onClick={() => window.api.openFolder(file.savedDirectory)}
                      >
                        열기
                      </button>
                      <button
                        className="ml-2 cursor-pointer rounded-lg bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
                        onClick={() => {
                          setTargetFile(file);
                          setIsDeleteOpen(true);
                        }}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FileHistory;
