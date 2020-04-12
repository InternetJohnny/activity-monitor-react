const { ipcRenderer } = require("electron");
const os = require("os-utils");
const Chart = require("chart.js");
var $ = require("jquery");

// General Chart class
let ChartInstance = class {
  constructor(blloc_id) {
    this.blloc = $(blloc_id);
    this.blloc_text = $(blloc_id).find(".value");
    this.donut = null;
    this.data = [];
    this.isGrayscale = false;
    this.interface = 0;
    this.setData().then(() => {
      this.drawChart(blloc_id);
      this.setWindowSize();
    });
  }

  toggleGrayscale() {
    this.isGrayscale = !this.isGrayscale;
    this.updateDatasets();
  }

  toggleInterface() {
    this.interface = (this.interface + 1) % 3;
    if (this.interface == 0) {
      this.blloc.removeClass("small");
    }
    if (this.interface == 1) {
      this.blloc.addClass("medium");
    }
    if (this.interface == 2) {
      this.blloc.removeClass("medium");
      this.blloc.addClass("small");
    }
  }

  setWindowSize() {
    ipcRenderer.send("resizeWindow");
  }

  getData() {
    // Declaration in subclasses
  }

  async setData() {
    this.data = await this.getData();
    // Caps the max % to 99 so it doesnt change width
    this.data[0] = this.data[0] == 100 ? 99 : this.data[0];
  }

  getColor() {
    if (this.isGrayscale) {
      return "#eee";
    }
    if (this.data[0] < 60) {
      return "#32c878";
    }
    if (this.data[0] < 80) {
      return "#faf837";
    }
    if (this.data[0] <= 100) {
      return "#ff4c00";
    }
  }

  updateDatasets() {
    this.blloc_text.text(this.data[0] + "%");
    this.donut.data.datasets[0].data = this.data;
    this.donut.data.datasets[0].backgroundColor = [
      this.getColor(),
      "rgba(0,0,0,0)"
    ];

    this.donut.update();
    this.setData();
  }

  drawChart(blloc_id) {
    // Find canvas element for drawing chart
    let blloc_chart = $(blloc_id).find("canvas");
    // Make chart
    this.donut = new Chart(blloc_chart, {
      type: "doughnut",
      data: {
        labels: ["Ram Used (%)", "Ram Free (%)"],
        datasets: [
          {
            data: this.data,
            backgroundColor: [this.getColor(), "rgba(0,0,0,0)"],
            borderColor: ["rgba(255,255,255,0.2)", "rgba(0,0,0,0)"],
            borderWidth: 0
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        title: {
          display: false
        },
        legend: {
          display: false
        }
      }
    });
    // Set update interval
    setInterval(() => {
      this.updateDatasets();
    }, 2000);
  }
};

// Ram class
let RamData = class extends ChartInstance {
  constructor(element) {
    super(element);
  }

  getData() {
    let ram_free = Math.round(os.freememPercentage() * 100);
    let ram_used = 100 - ram_free;
    return [ram_used, ram_free];
  }
};

// CPU class
let CpuData = class extends ChartInstance {
  constructor(element) {
    super(element);
  }

  // Returns promise for cpu usage
  getCpuUsage() {
    return new Promise((resolve, reject) => {
      os.cpuUsage(function(cpu) {
        var cpu_used = Math.round(cpu * 100);
        if (cpu_used) {
          resolve(cpu_used);
        } else {
          reject(Error("Could not retrieve CPU usage"));
        }
      });
    });
  }

  async getData() {
    let cpu_used = await this.getCpuUsage();
    let cpu_free = 100 - cpu_used;
    return [cpu_used, cpu_free];
  }
};

module.exports.RamData = RamData;
module.exports.CpuData = CpuData;
