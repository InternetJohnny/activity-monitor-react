const { ipcRenderer } = require("electron");
const { RamData, CpuData } = require("./scripts/chart-instance.js");
// const RamData = require("./scripts/ram-data.js");
// const CpuData = require("./scripts/cpu-data.js");
// import { RamData, CpuData } from "chart-instance.js";

const monitors = [];

function pinWindow() {
  ipcRenderer.send("pin-window");
}

function toggleGrayscale() {
  monitors.forEach(m => {
    m.toggleGrayscale();
  });
}

function toggleInterface() {
  monitors.forEach(m => {
    m.toggleInterface();
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
