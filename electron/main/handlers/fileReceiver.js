import fs from "fs";
import path from "path";

import { app } from "electron";

export function handleChunkReceive({
  fileId,
  chunkIndex,
  totalChunks,
  chunk,
  finalSavePath,
  extension,
}) {
  const saveDir = path.join(app.getPath("userData"), "received", fileId);
  if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir, { recursive: true });

  const chunkPath = path.join(saveDir, `chunk-${chunkIndex}`);
  fs.writeFileSync(chunkPath, Buffer.from(chunk));

  const receivedCount = fs.readdirSync(saveDir).filter((f) => f.startsWith("chunk-")).length;
  if (receivedCount === parseInt(totalChunks, 10)) {
    mergeChunks(saveDir, finalSavePath, fileId, extension);
  }
}

function mergeChunks(chunkDir, finalSavePath, fileId, extension) {
  const filenameWithExtension = `${fileId}${extension}`;
  const outputFilePath = path.join(finalSavePath, filenameWithExtension);
  const writeStream = fs.createWriteStream(outputFilePath);

  const sortedChunks = fs
    .readdirSync(chunkDir)
    .filter((name) => name.startsWith("chunk-"))
    .sort((a, b) => {
      const idxA = parseInt(a.split("-")[1], 10);
      const idxB = parseInt(b.split("-")[1], 10);
      return idxA - idxB;
    });

  for (const chunkFile of sortedChunks) {
    const chunkData = fs.readFileSync(path.join(chunkDir, chunkFile));
    writeStream.write(chunkData);
  }

  writeStream.end();
}
