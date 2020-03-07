import React from "react";
import logo from "./assets/details-main-logo.svg";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="background"></div>
      <div className="App-header">
        <img className="logo" src={logo} />
        <div>
          new <strong>alternative</strong> in music world...
        </div>
        <div>
          <button>create it with us</button>
        </div>
      </div>
    </div>
  );
}

export default App;
