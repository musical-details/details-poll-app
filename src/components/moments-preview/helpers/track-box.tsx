import React from "react";
import "./track-box.scss";

type TrackBoxProps = {
  author?: string;
  title?: string;
  name?: string;
  icon: string;
  selected?: boolean;
  trackRef?: React.RefObject<HTMLDivElement> | false;
  onClick?: () => void | false;
};

type TrackBoxState = {
  isTrackSelected: boolean;
};

class TrackBox extends React.Component<TrackBoxProps, TrackBoxState> {
  state: TrackBoxState = {
    isTrackSelected: false,
  };

  constructor(props: TrackBoxProps) {
    super(props);
  }

  render() {
    const { author, title, name, icon, selected } = this.props;
    return (
      <div className="track-box-wrapper">
        {selected && this.state.isTrackSelected && (
          <div className="selected-track-badge">
            +
            <i className="icon-ok" />
          </div>
        )}
        <div
          onClick={() => {
            this.props.onClick && this.props.onClick();
            this.setState({
              isTrackSelected: true,
            });
          }}
          ref={this.props.trackRef ? this.props.trackRef : null}
        >
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
