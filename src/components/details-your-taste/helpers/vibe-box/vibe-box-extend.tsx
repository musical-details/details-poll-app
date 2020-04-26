import React from "react";
import ReactionRanger from "./reaction-ranger";
import Timeline from "./timeline";
import { Elements } from "../../../phone/phone";

type VibeBoxExtendProps = {
  elements: Elements;
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
    const { elements } = this.props;
    return (
      <div className="extend">
        <div className="stages">
          <div className="stage-box done">1</div>
          <div className="stage-box current">2</div>
          <div className="stage-box">3</div>
          <div className="stage-box">4</div>
          <div className="stage-box">5</div>
        </div>
        <div className="message-box">
          <div>How do you rate this bassline?</div>
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
