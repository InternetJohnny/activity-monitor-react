import React from "react";
import { ipcRenderer } from "electron";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.closeWindow = this.closeWindow.bind(this);
    this.pinWindow = this.pinWindow.bind(this);
  }

  pinWindow() {
    ipcRenderer.send("pin-window");
  }

  closeWindow() {
    ipcRenderer.send("close-window");
  }

  render() {
    return (
      <div className="nav">
        <div className="options">
          <div id="pin" className="button" onClick={this.pinWindow}>
            <i className="fas fa-map-pin"></i>
          </div>
          <div
            id="resize"
            className="button"
            onClick={this.props.toggleInterface}
          >
            <i className="fas fa-compress"></i>
          </div>
          <div
            id="grayscale"
            className="button"
            onClick={this.props.toggleColor}
          >
            <i className="fas fa-adjust"></i>
          </div>
        </div>
        <div id="close" className="button" onClick={this.closeWindow}>
          <i className="fas fa-times"></i>
        </div>
      </div>
    );
  }
}

export default Nav;
