import  React, { useEffect, ChangeEvent } from "react";
import logo from "./assets/details-main-logo.svg";
import "./App.scss";
import Knob from "./components/knob-component/knob-component"

type AppState ={
  value: number
}

class App extends React.Component {

  state: AppState = {
    value: 0
  }

  render() {
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
        <Knob
          size={100}
          numTicks={40}
          degrees={270}
          min={1}
          max={100}
          value={0}
        />
      </div>
    );
  }
}



export default App;
