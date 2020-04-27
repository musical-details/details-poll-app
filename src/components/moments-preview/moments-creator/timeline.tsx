import React from "react";
import "./timeline.scss";
import CSS from "csstype";

type TimelineState = {};

type TimelineProps = {
  moveSpeed: number;
  offset: number;
  isRecording: boolean;
};

class Timeline extends React.Component<TimelineProps, TimelineState> {
  constructor(props: TimelineProps) {
    super(props);
  }
  render() {
    const { moveSpeed, offset, isRecording } = this.props;
    const tapeStyles: CSS.Properties = {
      // width: secondWidth * duration + "px",
      transform: `translate(${this.props.offset}px)`,
      transition: moveSpeed + "ms",
    };

    const recordingWrapperStyle: CSS.Properties = {
      display: this.props.isRecording ? "block" : "none",
    };

    return (
      <div className="timeline-wrapper">
        <div className="timeline-pointer"></div>
        <div className="tape" style={tapeStyles}>
          <div className="tape-inner">
            <div
              className="recording-wrapper"
              style={recordingWrapperStyle}
            ></div>
            <div className="moment"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Timeline;
