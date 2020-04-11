import React from "react";

class Nav extends React.Component {
  render() {
    return (
      <div className="nav">
        <div className="options">
          <div id="pin" className="button" onClick={pinWindow()}>
            <i className="fas fa-map-pin"></i>
          </div>
          <div id="resize" className="button" onClick={resizeWindow()}>
            <i className="fas fa-compress"></i>
          </div>
          <div id="grayscale" className="button" onClick={toggleGrayscale()}>
            <i className="fas fa-adjust"></i>
          </div>
        </div>
        <div id="close" className="button" onClick={closeWindow()}>
          <i className="fas fa-times"></i>
        </div>
      </div>
    );
  }
}

export default Nav;
