import React from "react";
import "./moments-preview.scss";

import Phone, { PhoneAnimationFrame } from "../phone/phone";
import animations from "../../assets/data/@moments-animations.json";
import userData from "../../assets/data/@moments-user-data.json";

import SearchInput from "../search-engine-preview/search-input";

import ConnectedApps from "./helpers/connected-apps";
import TracksList from "./helpers/tracks-list";

type MomentsPreviewProps = {
  userSelectedGenre: string;
  play: boolean;
};

export type Recent = {
  author: string;
  title: string;
  icon: string;
};

type Playlist = {
  name: string;
  icon: string;
};

type UserData = {
  app: string;
  recent: Array<Recent>;
  playlist: Array<Playlist>;
};

type Elements = { [key: string]: React.RefObject<HTMLDivElement> };

type MomentsPreviewState = {
  activeApp: string;
};

class MomentsPreview extends React.Component<
  MomentsPreviewProps,
  MomentsPreviewState
> {
  elements: Elements = {
    input_title: React.createRef(),
  };

  state: MomentsPreviewState = {
    activeApp: "Spotify",
  };

  constructor(props: MomentsPreviewProps) {
    super(props);
  }

  render() {
    const { userSelectedGenre } = this.props;
    return (
      <div className="moments-preview">
        <Phone
          elements={this.elements}
          animationFrames={animations.house as Array<PhoneAnimationFrame>}
          animate={false}
        >
          <div className="moments-app">
            <div className="moments-body">
              <div className="start-pointer-position"></div>
              <div className="logo-wrapper">
                <div className="logo moments-logo"></div>
              </div>
              <SearchInput
                inputId={1}
                className="select-genre"
                placeholder="http://yoursTrackUrlHere.com"
              />
              <ConnectedApps
                availableAppNames={["Spotify", "SoundCloud", "YT Music"]}
                activeApp={this.state.activeApp}
              />
            </div>
          </div>
        </Phone>
      </div>
    );
  }
}

export default MomentsPreview;
