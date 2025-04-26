// @ts-nocheck
import { contextBridge, ipcRenderer } from 'electron';

console.log("preloaded");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "electronAPI", {
    selectFile: () => ipcRenderer.invoke("dialog-select-file"),
    uploadFile: (filePath, userKey) => ipcRenderer.invoke("upload-file", filePath, userKey),
    
    // ADD these two for recovery:
    selectFolder: () => ipcRenderer.invoke("dialog-select-folder"),
    recoverFile: (cid, outputPath) => ipcRenderer.invoke("recover-file", cid, outputPath),
    deleteFile: (cid) => ipcRenderer.invoke('delete:file', cid), 
  }
);
