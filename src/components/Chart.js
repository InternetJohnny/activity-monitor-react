import React from "react";

class ChartInstance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blloc_text: $(blloc_id).find(".value"),
      donut: null,
      data: [],
      isGrayscale: false
    };

    this.setData().then(() => {
      this.drawChart(blloc_id);
      this.setWindowSize();
    });

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  toggleGrayscale() {
    console.log("toggling");
    this.isGrayscale = !this.isGrayscale;
    this.updateDatasets();
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

  render() {
    return <canvas className="chart"></canvas>;
  }
}

export default ChartInstance;
