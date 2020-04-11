import React from "react";
import ChartInstance from "./ChartInstance";

class Blloc extends React.Component {
  render() {
    return (
      <div className="blloc" id={this.props.type}>
        <div className="blloc-data">
          <span className="title">{this.props.type}</span>
          <span className="value"></span>
        </div>
        <div className="blloc-graph">
          <ChartInstance type={this.props.type} />
        </div>
      </div>
    );
  }
}

export default Blloc;
