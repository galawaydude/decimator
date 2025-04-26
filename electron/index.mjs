import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { ipcMain } from "electron";
import setupIPC from "./ipc/ipcHandlers.mjs"; 
import { registerIPFSHandlers, registerFileDialogs } from "./routes/ipfs.routes.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      nodeIntegration: true,
      contextIsolation: true,
      sandbox: false
    },
  });

  // In development, use the Vite dev server
  await mainWindow.loadURL("http://localhost:5173");

  // Register all handlers
  registerIPFSHandlers();
  registerFileDialogs(mainWindow);
  setupIPC(mainWindow);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
