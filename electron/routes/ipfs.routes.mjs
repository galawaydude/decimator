import { ipcMain, dialog } from "electron";
import { uploadFileToIPFS } from "../controllers/ipfs.controller.mjs";
import { uploadToIPFS } from "../utils/ipfsClient.mjs";  // Utility for interacting with IPFS
import runEncode from "../utils/encoder.mjs";
import { runRecovery } from "../utils/recover.mjs"; // <-- IMPORTANT: Adjust path
import { deleteFile } from "../utils/ipfs_rs_library.mjs";

export function registerIPFSHandlers() {
  ipcMain.handle("upload-file", async (event, filePath, userKey) => {
    try {
      console.log("[Routes] Starting upload for:", filePath);
      console.log("[Routes] Using user key:", userKey);
      const result = await runEncode(filePath, userKey);
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

  // 🆕 ADD THIS for selecting folder
  ipcMain.handle("dialog-select-folder", async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"]
    });
    if (result.canceled) return null;
    return result.filePaths[0];
  });

  ipcMain.handle("recover-file", async (event, cid, outputPath) => {
    try {
      const recoveredPath = await runRecovery(cid, outputPath); // <- using runRecovery now
      return { success: true, path: recoveredPath };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('delete:file', async (event, cid) => {
    try {
      const deleted = await deleteFile(cid); // your delete.mjs logic
      return { success: true, deleted };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });  
}
