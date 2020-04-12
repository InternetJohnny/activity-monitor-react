import React from "react";
import os from "os-utils";
import Blloc from "./Blloc";
import Nav from "./Nav";
import "../styles/style.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ram_val: 0, cpu_val: 0, color: true, interface: 0 };
    this.toggleColor = this.toggleColor.bind(this);
    this.toggleInterface = this.toggleInterface.bind(this);
  }

  toggleColor() {
    this.setState({
      color: !this.state.color
    });
  }

  toggleInterface() {
    this.setState({
      interface: (this.state.interface + 1) % 3
    });
  }

  componentDidMount() {
    this.ticker = setInterval(() => this.updateData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.ticker);
  }

  updateData() {
    console.log("has interface:" + this.state.interface);
    // Set new ram
    this.setState({
      ram_val: this.getRamUsed()
    });
    // Set new cpu
    this.getCpuUsed()
      .then(cpu_used => {
        this.setState({
          cpu_val: cpu_used
        });
      })
      .catch(rej => {
        console.log(rej);
      });
  }

  getRamUsed() {
    return 100 - Math.round(os.freememPercentage() * 100);
  }

  getCpuUsed() {
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

  render() {
    return (
      <div className="App">
        <Nav
          toggleColor={this.toggleColor}
          toggleInterface={this.toggleInterface}
        />
        <Blloc
          type="ram"
          used={this.state.ram_val}
          color={this.state.color}
          interface={this.state.interface}
        />
        <Blloc
          type="cpu"
          used={this.state.cpu_val}
          color={this.state.color}
          interface={this.state.interface}
        />
      </div>
    );
  }
}

export default App;
