const LinkGenerator = ({ link = "https://example.com", onCopy }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    if (onCopy) onCopy();
  };

  return (
    <div className="mx-auto flex w-full max-w-md overflow-hidden rounded-lg border border-gray-300 shadow-sm">
      <input
        type="text"
        value={link}
        disabled
        readOnly
        className="flex-1 cursor-text bg-neutral-100 px-4 py-2 text-gray-800 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-700"
      />
      <button
        type="button"
        onClick={handleCopy}
        className="bg-dodger-blue-500 hover:bg-dodger-blue-600 cursor-pointer px-4 text-sm font-medium text-white transition-colors"
      >
        복사
      </button>
    </div>
  );
};

export default LinkGenerator;
