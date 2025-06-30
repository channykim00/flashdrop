import { useState } from "react";
import { MdOutlineSecurity } from "react-icons/md";

const SecuritySettings = ({ settings, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, value) => {
    onChange({ ...settings, [field]: value });
  };

  const handlePasswordToggle = () => {
    const newShowPassword = !showPassword;
    setShowPassword(newShowPassword);
    if (!newShowPassword) {
      handleChange("password", "");
    }
  };

  return (
    <>
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-800">
        <MdOutlineSecurity /> 링크 보안 설정
      </h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm font-medium text-gray-700">전송자 이름 받기</label>
          <input
            type="checkbox"
            checked={settings.requireSenderName || false}
            onChange={(e) => handleChange("requireSenderName", e.target.checked)}
            className="text-dodger-blue-500 focus:ring-dodger-blue-500 h-5 w-5 rounded border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm font-medium text-gray-700">비밀번호 설정</label>
            <button
              onClick={handlePasswordToggle}
              className={`rounded px-3 py-1 text-sm text-white ${
                showPassword
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-dodger-blue-500 hover:bg-dodger-blue-600"
              }`}
            >
              {showPassword ? "제거하기" : "설정하기"}
            </button>
          </div>
          {showPassword && (
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={settings.password || ""}
              onChange={(e) => handleChange("password", e.target.value)}
              className="ml-32 w-60 rounded border border-gray-300 px-3 py-1 text-sm text-gray-800"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SecuritySettings;
