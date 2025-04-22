const { contextBridge, ipcRenderer } = require("electron");

console.log("preloaded");

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (msg) => ipcRenderer.send('message', msg),
  onMessage: (callback) => ipcRenderer.on('message', callback),
  uploadFile: (filePath) => ipcRenderer.invoke("upload-file", filePath),
  selectFile: () => ipcRenderer.invoke("dialog-select-file"),
});
