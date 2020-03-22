import  React, { useEffect } from "react";
import logo from "./assets/details-main-logo.svg";
import "./App.scss";
import Knob from "./components/knob-component/knob-component"

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
          <Knob/>
        </div>
  );
}



export default App;
