import React from "react";
import "./map-baloon.scss";

type MapBaloonProps = {
  position: { x: number; y: number };
  level: number;
  themeColor: string;
};
type MapBaloonState = {};

class MapBaloon extends React.Component<MapBaloonProps, MapBaloonState> {
  state: MapBaloonState = {};

  constructor(props: MapBaloonProps) {
    super(props);
  }

  getLabelClassName = (level: number): string => {
    if (level < 5) return "small";
    return "";
  };

  render() {
    const { position, level, children, themeColor } = this.props;
    return (
      <div
        className="baloon"
        style={{
          width: `${level * 2}px`,
          height: `${level * 2}px`,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div
          className="baloon-body"
          style={{ backgroundColor: themeColor }}
        ></div>
        <div className={`baloon-label ${this.getLabelClassName(level)}`}>
          <span style={{ color: themeColor }}>{children}</span>
        </div>
      </div>
    );
  }
}

export default MapBaloon;
