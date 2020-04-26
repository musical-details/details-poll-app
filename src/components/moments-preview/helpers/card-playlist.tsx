import React from "react";
import Card from "../../search-engine-preview/card";
import TrackBox from "./track-box";
import { Track } from "../moments-preview";
import "./card-playlist.scss";

type CardPlaylistProps = {
  hidden: boolean;
  playlistName: string;
  playlistTracks: Array<Track>;
};

class CardPlaylist extends React.Component<CardPlaylistProps> {
  render() {
    const { hidden, playlistName, playlistTracks } = this.props;
    return (
      <Card title={playlistName} hidden={hidden}>
        <div className="tracks-card-part">
          {playlistTracks.map((track: Track) => {
            return (
              <TrackBox
                author={track.author}
                title={track.title}
                icon={track.icon}
              />
            );
          })}
        </div>
      </Card>
    );
  }
}

export default CardPlaylist;
