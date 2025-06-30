import { GiSettingsKnobs } from "react-icons/gi";
import useLinkStore from "@/stores/linkStore";

const LinkSettings = () => {
  const { linkSettings, setLinkSettings } = useLinkStore();

  const handleChange = (field, value) => {
    setLinkSettings({ ...linkSettings, [field]: value });
  };

  return (
    <>
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-800">
        <GiSettingsKnobs /> 링크 설정
      </h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm font-medium text-gray-700">만료 시간</label>
          <select
            className="w-60 rounded border border-gray-300 px-3 py-1 text-sm text-gray-700"
            value={linkSettings.expireTime || "60"}
            onChange={(e) => handleChange("expireTime", e.target.value)}
          >
            <option value="30">30분</option>
            <option value="60">1시간</option>
            <option value="120">2시간</option>
            <option value="360">6시간</option>
            <option value="720">12시간</option>
            <option value="1440">24시간</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-32 text-sm font-medium text-gray-700">허용 파일 형식</label>
          <select
            className="w-60 rounded border border-gray-300 px-3 py-1 text-sm text-gray-700"
            value={linkSettings.allowedFileTypes || "all"}
            onChange={(e) => handleChange("allowedFileTypes", e.target.value)}
          >
            <option value="all">모든 형식</option>
            <option value="image">이미지 (JPG, PNG, GIF, BMP, WEBP)</option>
            <option value="pdf">PDF</option>
            <option value="doc">문서 (DOC, DOCX, TXT, RTF)</option>
            <option value="spreadsheet">스프레드시트 (XLS, XLSX, CSV)</option>
            <option value="presentation">프레젠테이션 (PPT, PPTX)</option>
            <option value="video">영상 (MP4, MOV, AVI, MKV)</option>
            <option value="audio">음성 (MP3, WAV, M4A)</option>
            <option value="archive">압축 파일 (ZIP, RAR, 7Z)</option>
            <option value="code">코드 파일 (JS, HTML, CSS, JSON)</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-32 text-sm font-medium text-gray-700">최대 파일 크기</label>
          <select
            className="w-60 rounded border border-gray-300 px-3 py-1 text-sm text-gray-700"
            value={linkSettings.maxFileSize || "2GB"}
            onChange={(e) => handleChange("maxFileSize", e.target.value)}
          >
            <option value="10MB">10MB</option>
            <option value="100MB">100MB</option>
            <option value="500MB">500MB</option>
            <option value="1GB">1GB</option>
            <option value="2GB">2GB</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-32 text-sm font-medium text-gray-700">자동 수락</label>
          <input
            type="checkbox"
            checked={linkSettings.autoAccept || false}
            onChange={(e) => handleChange("autoAccept", e.target.checked)}
            className="text-dodger-blue-500 focus:ring-dodger-blue-500 h-5 w-5 rounded border-gray-300"
          />
        </div>
      </div>
    </>
  );
};

export default LinkSettings;
