import React from "react";
import ChartInstance from "./ChartInstance";

class RamData extends ChartInstance {
  constructor(props) {
    super(props);
    this.state = {
      blloc_text: $(blloc_id).find(".value"),
      donut: null,
      data: [],
      isGrayscale: false
    };

  render() {
    return <canvas className="chart"></canvas>;
  }
}

export default RamData;
