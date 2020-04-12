import React from "react";
import Blloc from "./Blloc";
import Nav from "./Nav";
import "../styles/style.min.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <Blloc type="ram" />
      <Blloc type="cpu" />
    </div>
  );
}

export default App;
