const { ipcRenderer } = require("electron");
// import { RamData, CpuData } from "./scripts/chart.mjs";
const { RamData, CpuData } = require("%PUBLIC_URL%/scripts/chart.mjs");

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
  addMonitor(new RamData("#ram"));
  addMonitor(new CpuData("#cpu"));
});
