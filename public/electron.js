const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");
// import { app, BrowserWindow, ipcMain } from "electron";
// import path from "path";
// import url from "url";
// import isDev from "electron-is-dev";

let mainWindow;
let isPinned = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    useContentSize: true,
    // Set the initial width to 500px
    width: 1000,
    // Set the initial height to 400px
    height: 400,
    // set the title bar style
    titleBarStyle: "hiddenInset",
    // set the background color to black
    //backgroundColor: "#000",
    // make the background transparent
    transparent: true,
    // don't show a frame around it
    // frame: false,
    // Don't show the window until it's ready, this prevents any white flickering
    show: false,
    // allows resizing pinWindow
    resizable: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.on("closed", () => (mainWindow = null));
}

ipcMain.on("pin-window", (event, arg) => {
  isPinned = !isPinned;
  mainWindow.setAlwaysOnTop(isPinned);
});

ipcMain.on("close-window", (event, arg) => {
  app.quit();
});

app.on("ready", createWindow);

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
