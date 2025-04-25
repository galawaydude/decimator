import { ipcMain, dialog } from "electron";
import { uploadFileToIPFS } from "../controllers/ipfs.controller.mjs";
import { uploadToIPFS } from "../utils/ipfsClient.mjs";  // Utility for interacting with IPFS
import runEncode from "../utils/encoder.mjs";

export function registerIPFSHandlers() {
  ipcMain.handle("upload-file", async (event, filePath) => {
    try {
      console.log("[Routes] Starting upload for:", filePath);
      const result = await runEncode(filePath);
      return result;
    } catch (err) {
      console.error("[Routes] Error in upload-file handler:", err);
      throw new Error(err.message || 'Upload failed');
    }
  });
}

export function registerFileDialogs(mainWindow) {
  ipcMain.handle("dialog-select-file", async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ["openFile"],
    });

    return result;
  });
}