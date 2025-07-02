import { CLIENT_URL } from "@/constants";
export default function fullUrl(uniqueUrl) {
  return `${CLIENT_URL}/${uniqueUrl}`;
}
