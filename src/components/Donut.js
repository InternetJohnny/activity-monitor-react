import React from "react";
import Chart from "chart.js";
let myChart;
let data;
let isGrayscale = false;

class Donut extends React.Component {
  constructor(props) {
    super(props);
    this.value = props.value;
  }

  chartRef = React.createRef();

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.data = [this.props.value, 100 - this.props.value];
    myChart.data.datasets[0].data = this.data;
    myChart.data.datasets[0].backgroundColor = [
      this.getColor(),
      "rgba(0,0,0,0)"
    ];
    myChart.update();
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

  buildChart = () => {
    let data = [this.props.value, 100 - this.props.value];
    const myChartRef = this.chartRef.current.getContext("2d");
    // const { data, average, labels } = this.props;

    if (typeof myChart !== "undefined") myChart.destroy();

    myChart = new Chart(myChartRef, {
      type: "doughnut",
      data: {
        labels: ["Ram Used (%)", "Ram Free (%)"],
        datasets: [
          {
            data: data,
            backgroundColor: ["rgba(50, 200, 120, 1)", "rgba(0,0,0,0)"],
            borderColor: ["rgba(255,255,255,1)", "rgba(0,0,0,0)"],
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
  };

  render() {
    return <canvas className="chart" ref={this.chartRef} />;
  }
}

export default Donut;
