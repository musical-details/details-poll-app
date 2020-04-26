import React from "react";
import { Elements } from "../../../phone/phone";

type VibeBoxBasicProps = {
  elements: Elements;
  rateStatus: boolean | null;
  onRate?: (isLiked: boolean) => void;
};
type VibeBoxBasicState = {};

class VibeBoxBasic extends React.Component<
  VibeBoxBasicProps,
  VibeBoxBasicState
> {
  state: VibeBoxBasicState = {};

  constructor(props: VibeBoxBasicProps) {
    super(props);
  }

  handleLikeItClick = () => {
    const { onRate } = this.props;
    onRate && onRate(true);
  };

  handleNotLikeItClick = () => {
    const { onRate } = this.props;
    onRate && onRate(false);
  };

  getSongCoverClassName = (rateStatus: boolean | null): string => {
    if (rateStatus === null) return "";
    return rateStatus === true ? "like_it" : "not_like_it";
  };

  render() {
    const { elements, rateStatus } = this.props;
    return (
      <div className="basic">
        <div className="message-box">
          <div>Do you like this vibes?</div>
        </div>
        <div className="rate-box">
          <div className="reaction-box">
            <i className="icon-thumbs-down"></i>
          </div>
          <div className="song-cover-static-wrapper">
            <div
              className={`song-cover-box ${this.getSongCoverClassName(
                rateStatus
              )}`}
            >
              <div className="controls">
                <div
                  className="like_it"
                  ref={elements["button_like_it"]}
                  onClick={this.handleLikeItClick}
                ></div>
                <div
                  className="not_like_it"
                  ref={elements["button_not_like_it"]}
                  onClick={this.handleNotLikeItClick}
                ></div>
              </div>
              <div className="background"></div>
              <div className="cover-wrapper">
                <div className="song-cover"></div>
              </div>
            </div>
          </div>

          <div className="reaction-box">
            <i className="icon-thumbs-up"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default VibeBoxBasic;
