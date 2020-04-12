import React from "react";
import { RamData, CpuData } from "../scripts/chart-instance";
// const { RamData, CpuData } = require("../scripts/chart-instance.js");

class Blloc extends React.Component {
  constructor(props) {
    super(props);
    this.type = props.type;
  }

  render() {
    let chart_instance;
    if (this.type == "ram") {
      chart_instance = <span>hello</span>;
    }
    if (this.type == "cpu") {
      chart_instance = <span>cpu</span>;
    }
    return (
      <div className="blloc" id={this.props.type}>
        <div className="blloc-data">
          <span className="title">{this.props.type}</span>
          <span className="value"></span>
        </div>
        <div className="blloc-graph">
          {chart_instance}
          {/* <canvas className="chart"></canvas>*/}
        </div>
      </div>
    );
  }
}

export default Blloc;
