import React from "react";
import Donut from "./Donut";

class Blloc extends React.Component {
  constructor(props) {
    super(props);
    this.state = { type: props.type };
  }

  render() {
    let chart_instance;
    if (this.state.type == "ram") {
      chart_instance = <span>hello</span>;
    }
    if (this.state.type == "cpu") {
      chart_instance = <span>cpu</span>;
    }
    return (
      <div
        className={`blloc ${
          this.props.interface == 0
            ? ""
            : this.props.interface == 1
            ? "medium"
            : "small"
        }`}
        id={this.state.type}
      >
        <div className="blloc-data">
          <span className="title">{this.state.type}</span>
          <span className="used">{this.props.used}%</span>
        </div>
        <div className="blloc-graph">
          <Donut
            used={this.props.used}
            color={this.props.color}
            interface={this.state.interface}
          ></Donut>
        </div>
      </div>
    );
  }
}

export default Blloc;
