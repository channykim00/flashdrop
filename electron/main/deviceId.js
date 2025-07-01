import fs from "fs";
import path from "path";

import { app } from "electron";
import machineId from "node-machine-id";

export function getOrCreateDeviceId() {
  const deviceIdPath = path.join(app.getPath("userData"), "device_id.json");

  if (fs.existsSync(deviceIdPath)) {
    const file = fs.readFileSync(deviceIdPath, "utf-8");
    const { deviceId } = JSON.parse(file);
    if (deviceId) return deviceId;
  }

  const deviceId = machineId.machineIdSync(true);

  fs.writeFileSync(deviceIdPath, JSON.stringify({ deviceId }), "utf-8");
  return deviceId;
}
