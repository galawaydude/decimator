import { app, BrowserWindow } from "electron";
import path from "path";

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,  // prevent security risks
      contextIsolation: true,
    },
  });

  mainWindow.loadURL("http://localhost:5173"); // Vite React Dev Server

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});
