import useLinkStore from "@/stores/linkStore";

const LinkManagement = () => {
  const { folderPath, linkSettings, securitySettings } = useLinkStore();

  return (
    <div className="mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">링크 관리</h1>

      <section className="mb-6 rounded border border-gray-200 bg-white p-4 shadow">
        <h2 className="mb-2 text-lg font-semibold text-gray-700">폴더 경로</h2>
        <p className="text-sm text-gray-800">{folderPath || "선택된 폴더 없음"}</p>

        <h2 className="mb-2 text-lg font-semibold text-gray-700">링크 설정</h2>
        <ul className="space-y-1 text-sm text-gray-800">
          <li>만료 시간: {linkSettings.expireTime}분</li>
          <li>허용 파일 형식: {linkSettings.allowedFileTypes}</li>
          <li>최대 파일 크기: {linkSettings.maxFileSize}</li>
          <li>자동 수락: {linkSettings.autoAccept ? "예" : "아니오"}</li>
        </ul>

        <h2 className="mb-2 text-lg font-semibold text-gray-700">보안 설정</h2>
        <ul className="space-y-1 text-sm text-gray-800">
          <li>전송자 이름 필수: {securitySettings.requireSenderName ? "예" : "아니오"}</li>
          <li>비밀번호 설정됨: {securitySettings.password ? securitySettings.password : "없음"}</li>
        </ul>
      </section>
    </div>
  );
};

export default LinkManagement;
