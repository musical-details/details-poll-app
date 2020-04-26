import React from "react";
import "./track-box.scss";

type TrackBoxProps = {
  author?: string;
  title?: string;
  name?: string;
  icon: string;
};

class TrackBox extends React.Component<TrackBoxProps> {
  render() {
    const { author, title, name, icon } = this.props;
    return (
      <div className="track-box-wrapper">
        <div>
          <img src={icon} alt="TrackCover" />
        </div>
        {author && <div className="track-box-author"> {author}</div>}
        {title && <div className="track-box-title">{title}</div>}
        {name && <div className="track-box-name">{name}</div>}
      </div>
    );
  }
}

export default TrackBox;
