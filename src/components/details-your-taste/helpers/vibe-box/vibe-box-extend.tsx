import React from "react";
import ReactionRanger from "./reaction-ranger";
import Timeline from "./timeline";
import { Elements } from "../../../phone/phone";
import { Song } from "../../details-your-taste";

type VibeBoxExtendProps = {
  song: Song;
  elements: Elements;
  currentMoment: number;
};
type VibeBoxExtendState = {};

class VibeBoxExtend extends React.Component<
  VibeBoxExtendProps,
  VibeBoxExtendState
> {
  state: VibeBoxExtendState = {};

  constructor(props: VibeBoxExtendProps) {
    super(props);
  }

  render() {
    const { elements, song, currentMoment } = this.props;
    return (
      <div className="extend">
        <div className="stages">
          {song.moments.map((moment, i) => (
            <div
              className={`stage-box ${i < currentMoment ? "done" : ""} ${
                i === currentMoment ? "current" : ""
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="message-box">
          <div>{song.moments[currentMoment].message}</div>
        </div>
        <div className="timeline-box-wrapper">
          <Timeline />
        </div>
        <div className="rate-box-wrapper">
          <ReactionRanger />
          <div className="reaction-button">
            <i className="icon-to-end" />
          </div>
        </div>
      </div>
    );
  }
}

export default VibeBoxExtend;
