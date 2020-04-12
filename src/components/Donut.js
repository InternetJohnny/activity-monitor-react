import React from "react";
import Chart from "chart.js";

class Donut extends React.Component {
  constructor(props) {
    super(props);
    this.state = { myChart: null };
  }

  chartRef = React.createRef();

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.state.myChart.data.datasets[0].data = [
      this.props.used,
      100 - this.props.used
    ];
    this.state.myChart.data.datasets[0].backgroundColor = [
      this.getColor(),
      "rgba(0,0,0,0)"
    ];
    this.state.myChart.update();
  }

  getColor() {
    if (!this.props.color) {
      return "#eee";
    }
    if (this.props.used < 60) {
      return "#32c878";
    }
    if (this.props.used < 80) {
      return "#faf837";
    }
    if (this.props.used <= 100) {
      return "#ff4c00";
    }
  }

  buildChart = () => {
    let data = [this.props.used, 100 - this.props.used];
    const myChartRef = this.chartRef.current.getContext("2d");
    // const { data, average, labels } = this.props;

    if (typeof this.state.myChart !== "undefined") this.state.myChart = null;

    this.state.myChart = new Chart(myChartRef, {
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
