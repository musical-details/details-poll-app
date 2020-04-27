import React from "react";
import Card from "../../search-engine-preview/card";
import TrackBox from "./track-box";
import { Track } from "../moments-preview";
import "./card-playlist.scss";

type CardPlaylistProps = {
  hidden: boolean;
  playlistName: string;
  playlistTracks: Array<Track>;
  trackRef: React.RefObject<HTMLDivElement>;
  closeRef: React.RefObject<HTMLDivElement>;
  onHide: () => void;
};

class CardPlaylist extends React.Component<CardPlaylistProps> {
  render() {
    const {
      hidden,
      playlistName,
      playlistTracks,
      trackRef,
      closeRef,
      onHide,
    } = this.props;
    return (
      <Card
        closeRef={closeRef}
        title={playlistName}
        hidden={hidden}
        onHide={onHide}
      >
        <div className="tracks-card-part">
          <div className="card-shadow"></div>
          {playlistTracks.map((track: Track, i: number) => {
            return (
              <TrackBox
                author={track.author}
                title={track.title}
                icon={track.icon}
                selected={i === 6 && true}
                trackRef={i === 6 && trackRef}
              />
            );
          })}
        </div>
      </Card>
    );
  }
}

export default CardPlaylist;
