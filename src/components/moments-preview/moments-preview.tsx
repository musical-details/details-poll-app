import React from "react";
import "./moments-preview.scss";

import Phone, { PhoneAnimationFrame } from "../phone/phone";
import animations from "../../assets/data/@moments-animations.json";
import userData from "../../assets/data/@moments-user-data.json";
import playlistTracks from "../../assets/data/@moments-playlists-data.json";

import ConnectedApps from "./helpers/connected-apps";
import TrackBox from "./helpers/track-box";
import CardPlaylist from "./helpers/card-playlist";

type MomentsPreviewProps = {
  userSelectedGenre: string;
  play: boolean;
};

export type Track = {
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
  recent: Array<Track>;
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
  refCount: number = 2;
  elements: Elements = {
    active_app: React.createRef(),
    app_select_1: React.createRef(),
  };

  state: MomentsPreviewState = {
    activeApp: "SoundCloud",
  };

  constructor(props: MomentsPreviewProps) {
    super(props);
  }

  render() {
    const { userSelectedGenre } = this.props;

    const activeAppData: Array<UserData> = userData[
      userSelectedGenre as "house"
    ].filter((appData: UserData) => appData.app === this.state.activeApp);

    const activePlaylistTracks: Array<Track> = playlistTracks[
      userSelectedGenre as "house"
    ]["playlistTracks"].map((track: Track) => track);

    return (
      <div className="moments-preview">
        <Phone
          elements={this.elements}
          animationFrames={animations.house as Array<PhoneAnimationFrame>}
          animate={false}
          animationSpeed={1}
        >
          <div className="moments-app">
            <div className="moments-body">
              <div className="start-pointer-position"></div>
              <div className="logo-wrapper">
                <div className="logo moments-logo"></div>
              </div>

              <ConnectedApps
                appRef={this.elements["active_app"]}
                availableAppNames={["Spotify", "SoundCloud", "YT Music"]}
                activeApp={this.state.activeApp}
              />

              <div className="tracks-list-wrapper">
                <div className="tracks-list-header">
                  Choose from recent favourites
                </div>
                <div className="tracks-list">
                  {activeAppData[0]["recent"].map((recent: Track) => {
                    return (
                      <TrackBox
                        author={recent.author}
                        title={recent.title}
                        icon={recent.icon}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="tracks-list-wrapper">
                <div className="tracks-list-header">Choose from playlist</div>
                <div className="tracks-list">
                  {activeAppData[0]["playlist"].map((playlist: Playlist) => {
                    return (
                      <TrackBox name={playlist.name} icon={playlist.icon} />
                    );
                  })}
                </div>
              </div>

              <CardPlaylist
                hidden={true}
                playlistName={"New Vibes"}
                playlistTracks={activePlaylistTracks}
              />

              <div className="url-input">Paste URL Here</div>

              <div className="rate-button-wrapper">
                <button className="rate-button">rate</button>
              </div>
            </div>
          </div>
        </Phone>
      </div>
    );
  }
}

export default MomentsPreview;
