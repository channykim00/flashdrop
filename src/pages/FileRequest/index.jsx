import { BsInboxesFill } from "react-icons/bs";
import useUploadRequestStore from "@/stores/useUploadRequestStore";
import formatFileSize from "@/utils/formatFileSize";

const FileRequest = () => {
  const { requests, removeRequest } = useUploadRequestStore();

  const handleAcceptFile = (uploadData) => {
    window.api.sendAcceptedUpload(uploadData);
    removeRequest(uploadData.fileId);
  };
  const handleDeclineFile = (uploadData) => {
    removeRequest(uploadData.fileId);
  };
  return (
    <div>
      <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
        <BsInboxesFill className="mr-3" />
        파일 받기 링크 생성
      </h1>
      <section className="mt-6">
        <div className="rounded-lg bg-white p-5 shadow">
          <div className="overflow-x-auto rounded-lg bg-white shadow-md">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-100 text-xs tracking-wider text-gray-500 uppercase">
                <tr className="text-center">
                  <th className="px-6 py-4">파일명</th>
                  <th className="px-6 py-4">용량</th>
                  <th className="px-6 py-4">연결된 링크</th>
                  <th className="px-6 py-4">업로드 시간</th>
                  <th className="px-6 py-4">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-center">
                {requests.map((requests) => (
                  <tr
                    className="hover:bg-gray-50"
                    key={requests.fileId}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{requests.filename}</td>
                    <td className="px-6 py-4">{formatFileSize(requests.size)}</td>
                    <td className="px-6 py-4">백엔드 개인 과제</td>
                    <td className="px-6 py-4">2025.07.07 18:50</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          className="cursor-pointer rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-600 transition hover:bg-gray-100"
                          onClick={() => handleDeclineFile(requests)}
                        >
                          거절
                        </button>
                        <button
                          className="bg-dodger-blue-500 hover:bg-dodger-blue-600 cursor-pointer rounded-lg px-3 py-1 text-sm font-semibold text-white shadow transition"
                          onClick={() => handleAcceptFile(requests)}
                        >
                          수락
                        </button>
                      </div>
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

export default FileRequest;
