import React from "react";
import "./tracks-list.scss";
import Recent from "../moments-preview";

type TracksListProps = {
  recentTracks: Array<Recent>;
};

class TracksList extends React.Component<TracksListProps> {
  render() {
    return (
      <div className="tracks-list-wrapper">
        <div className="tracks-list-header">Choose from recent favourites</div>
        <div className="tracks-list"></div>
      </div>
    );
  }
}

export default TracksList;
