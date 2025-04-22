import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { ipcMain } from "electron";
import setupIPC from "./ipc/ipcHandlers.mjs"; 
import { registerIPFSHandlers, registerFileDialogs } from "./routes/ipfs.routes.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"), 
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL("http://localhost:5173"); // Vite React Dev Server

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  setupIPC(mainWindow); // Setup ipcMain handlers here
  registerIPFSHandlers();
  registerFileDialogs(mainWindow);
  
});
