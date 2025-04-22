import { ipcMain } from "electron";
import { handleFileUpload } from "../controllers/upload.controller.mjs";
// import { registerFileDialogs } from "../routes/ipfs.routes.mjs";
// this was also for testin, wait for some iter then remove this
export default function setupIPC() {
  // ipcMain.handle("upload-file", async (event, filePath) => {
  //   return await handleFileUpload(filePath);
  // });
  
  ipcMain.on("message", (event, msg) => {
    console.log("Received in main:", msg);
    event.sender.send("message", "Pong from Electron main!");
  });
}
