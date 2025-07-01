export default function parseFileSize(stringSize) {
  const units = {
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
  };

  const match = stringSize.match(/^(\d+)(MB|GB)$/);
  if (!match) return 0;

  const [, value, unit] = match;
  return parseInt(value, 10) * units[unit];
}
