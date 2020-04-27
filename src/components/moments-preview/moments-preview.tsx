import React from "react";
import "./moments-preview.scss";

import Phone, { PhoneAnimationFrame } from "../phone/phone";
import { SearchButton } from "../search-engine-preview/search-input";
import animations from "../../assets/data/@moments-animations.json";
import userData from "../../assets/data/@moments-user-data.json";
import playlistTracks from "../../assets/data/@moments-playlists-data.json";

import ConnectedApps from "./helpers/connected-apps";
import TrackBox from "./helpers/track-box";
import CardPlaylist from "./helpers/card-playlist";
import MomentsCreator from "./moments-creator/moments-creator";

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
  cardPlaylistHidden: boolean;
  momentCreatorHidden: boolean;
};

class MomentsPreview extends React.Component<
  MomentsPreviewProps,
  MomentsPreviewState
> {
  refCount: number = 4;
  elements: Elements = {
    active_app: React.createRef(),
    playlist_select: React.createRef(),
    track_select: React.createRef(),
    close_playlist_card: React.createRef(),
    button_rate: React.createRef(),
    button_record: React.createRef(),
  };

  state: MomentsPreviewState = {
    activeApp: "Spotify",
    cardPlaylistHidden: true,
    momentCreatorHidden: true,
  };

  constructor(props: MomentsPreviewProps) {
    super(props);
  }

  handleAppOnClick = (e: EventTarget & HTMLDivElement): void => {
    this.setState({
      activeApp: e.title,
    });
  };

  handlePlaylistOnClick = (): void | false => {
    this.setState({
      cardPlaylistHidden: false,
    });
  };

  handlePlaylistCardOnHide = (): void => {
    this.setState({
      cardPlaylistHidden: true,
    });
  };

  handleRateButtonOnClick = (): void => {
    this.setState({
      momentCreatorHidden: false,
    });
  };

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
          animationFrames={animations.test as Array<PhoneAnimationFrame>}
          animate={this.props.play}
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
                onClick={this.handleAppOnClick}
              />

              <div className="tracks-list-wrapper">
                <div className="tracks-list-header">
                  Choose from recent favourites
                </div>
                <div className="tracks-list-shadow"></div>
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
                <div className="tracks-list-shadow"></div>
                <div className="tracks-list">
                  {activeAppData[0]["playlist"].map(
                    (playlist: Playlist, i: number) => {
                      return (
                        <TrackBox
                          trackRef={i === 1 && this.elements["playlist_select"]}
                          onClick={this.handlePlaylistOnClick}
                          name={playlist.name}
                          icon={playlist.icon}
                        />
                      );
                    }
                  )}
                </div>
              </div>

              <CardPlaylist
                playlistName={"New Vibes"}
                playlistTracks={activePlaylistTracks}
                hidden={this.state.cardPlaylistHidden}
                onHide={this.handlePlaylistCardOnHide}
                trackRef={this.elements["track_select"]}
                closeRef={this.elements["close_playlist_card"]}
              />

              <div className="url-input">Paste URL Here</div>
              <div className="search-button-wrapper">
                <SearchButton
                  inputRef={this.elements["button_rate"]}
                  onClick={this.handleRateButtonOnClick}
                >
                  Rate
                </SearchButton>
              </div>

              <MomentsCreator elements={this.elements} hidden={false} />
            </div>
          </div>
        </Phone>
      </div>
    );
  }
}

export default MomentsPreview;
