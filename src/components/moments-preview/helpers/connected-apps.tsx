import React from "react";
import musicApplications from "../../../assets/data/music-applications.json";
import "./connected-apps.scss";

import CSS from "csstype";

type ConnectedAppsProps = {
  availableAppNames: Array<string>;
  activeApp: string;
  appRef: React.RefObject<HTMLDivElement>;
  onClick: (e: EventTarget & HTMLDivElement) => void;
};

type Application = {
  name: string;
  logo: string;
};

function ConnectedApps(props: ConnectedAppsProps) {
  let appIconStyle: CSS.Properties = {
    borderBottom: "2px solid rgb(156, 156, 156)",
  };
  return (
    <div className="connected-apps-wrapper">
      <div className="connected-apps-header">Connected Accounts</div>
      <div className="connected-apps">
        {props.availableAppNames.map((availableAppName: string) => {
          const musicApplication: Application | any = musicApplications.find(
            (musicApplication: Application) =>
              musicApplication.name === availableAppName
          );
          return (
            <div
              title={musicApplication.name}
              onClick={(e) => {
                props.onClick(e.currentTarget);
              }}
              ref={"SoundCloud" === musicApplication.name ? props.appRef : null}
            >
              <img
                className="app-icon"
                style={
                  props.activeApp === musicApplication.name
                    ? appIconStyle
                    : undefined
                }
                src={require("../../../assets/logotypes/" +
                  musicApplication?.logo)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ConnectedApps;
