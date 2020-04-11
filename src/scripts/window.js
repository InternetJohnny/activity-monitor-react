const { ipcRenderer } = require("electron");
const { RamData, CpuData } = require("/scripts/chart.mjs");
// import { RamData, CpuData } from "./scripts/chart.mjs";

const monitors = [];

function pinWindow() {
  ipcRenderer.send("pin-window");
}

function toggleGrayscale() {
  monitors.forEach(m => {
    m.toggleGrayscale();
  });
}

function closeWindow() {
  ipcRenderer.send("close-window");
}

function addMonitor(m) {
  console.log(monitors.length);
  monitors[monitors.length] = m;
}

$(() => {
  console.log("hello");
  addMonitor(new RamData("#ram"));
  addMonitor(new CpuData("#cpu"));
});
