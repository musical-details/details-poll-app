import React from "react";
import "./moments-creator.scss";
import CSS from "csstype";
import Timeline from "./timeline";
import { Elements } from "../../phone/phone";

type MomentsCreatorState = {
  timelineOffset: number;
  isRecording: boolean;
};

type MomentsCreatorProps = {
  hidden: boolean;
  elements: Elements;
};

class MomentsCreator extends React.Component<
  MomentsCreatorProps,
  MomentsCreatorState
> {
  state: MomentsCreatorState = {
    timelineOffset: 140,
    isRecording: false,
  };

  constructor(props: MomentsCreatorProps) {
    super(props);
  }

  handleRecordButtonOnClick = (): void => {
    this.setState({
      isRecording: true,
      timelineOffset: -60,
    });
  };

  render() {
    const { isRecording, timelineOffset } = this.state;
    const { elements } = this.props;
    return (
      <div className="moments-creator-wrapper">
        <div className="moments-creator">
          <div className="logo-wrapper">
            <div className="logo moments-logo"></div>
          </div>

          <Timeline
            isRecording={isRecording}
            moveSpeed={4000}
            offset={timelineOffset}
          />

          <div className="timeline-player-wrapper">
            <div className="button-play"></div>
            <div className="track-player"></div>
            <div
              className="button-record"
              ref={elements["button_record"]}
              onClick={this.handleRecordButtonOnClick}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default MomentsCreator;
