import React from "react";
import "./map.scss";
import MapBaloon from "../map-baloon/map-baloon";

type MapProps = {};
type MapState = {};

class Map extends React.Component<MapProps, MapState> {
  state: MapState = {};

  constructor(props: MapProps) {
    super(props);
  }

  render() {
    return (
      <div className="map">
        <div>
          <div className="options-wrapper">
            <div className="options">
              <div className="option">
                <div>Your genres</div>
              </div>
              <div className="option">
                <div>Your moods</div>
              </div>
              <div className="option">
                <div>Your sounds</div>
              </div>
            </div>
          </div>
          <div className="graph-wrapper">
            <div className="graph">
              <MapBaloon
                level={3}
                position={{ x: 10, y: 10 }}
                themeColor="#ffcb64"
              >
                Drum & Bass
              </MapBaloon>
              <MapBaloon
                level={15}
                position={{ x: -70, y: 20 }}
                themeColor="#4886cc"
              >
                Electronic
              </MapBaloon>
              <MapBaloon
                level={8}
                position={{ x: 30, y: -10 }}
                themeColor="#c34d88"
              >
                Techno
              </MapBaloon>
              <MapBaloon
                level={8}
                position={{ x: 70, y: -50 }}
                themeColor="#8466b9"
              >
                Trap
              </MapBaloon>
              <MapBaloon
                level={10}
                position={{ x: -80, y: -40 }}
                themeColor="#d44b67"
              >
                House
              </MapBaloon>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Map;
