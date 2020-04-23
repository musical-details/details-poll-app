import React from "react";
import "./phone.scss";
import PhonePointer from "../phone-pointer/phone-pointer";
import PhoneAudio, { Song } from "../phone-audio/phone-audio";

export type Elements = { [key: string]: React.RefObject<HTMLDivElement> };

export type PhoneAnimationFrame = {
  position: { x: number; y: number } | { element: string };
  movingDuration?: number;
  standingDuration?: number;
  eventName: null | "click" | "slideUp" | "slideDown";
};

type PhoneProps = {
  animationFrames: Array<PhoneAnimationFrame>;
  animationSpeed?: number;
  elements: Elements;
  animate: boolean;
  song?: Song;
  songPlay?: boolean;
  songVolume?: number;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
};

type PhoneState = {
  currentFrameIndex: number;
};

class Phone extends React.Component<PhoneProps, PhoneState> {
  phoneInnerRef: React.RefObject<HTMLDivElement> = React.createRef();
  state: PhoneState = {
    currentFrameIndex: 0,
  };

  constructor(props: PhoneProps) {
    super(props);
  }

  componentDidMount() {
    const { animate } = this.props;
    if (!animate) return;
  }

  componentDidUpdate(oldProps: PhoneProps) {
    const { animate } = this.props;
    if (oldProps.animate === animate || !animate) return;
  }

  handleAnimationFrameEnd = () => {
    const { animationFrames } = this.props;
    const { currentFrameIndex } = this.state;
    if (currentFrameIndex >= animationFrames.length - 1) return;

    this.setState({
      currentFrameIndex: currentFrameIndex + 1,
    });
  };

  getElementRef = (): React.RefObject<HTMLDivElement> | null => {
    const { animationFrames, elements } = this.props;
    const { currentFrameIndex } = this.state;
    const currentPosition = animationFrames[currentFrameIndex].position;
    return currentPosition.hasOwnProperty("element")
      ? elements[(currentPosition as { element: string }).element]
      : null;
  };

  render() {
    const {
      animationFrames,
      children,
      song,
      songPlay,
      songVolume,
      animationSpeed,
    } = this.props;

    const { currentFrameIndex } = this.state;

    return (
      <div className="search-engine-preview">
        <div className="phone-mock">
          <div className="phone-area">
            <div className="phone-outer"></div>
            <div className="phone-safe"></div>
            <div className="phone-inner">
              <div className="phone-inner-body" ref={this.phoneInnerRef}>
                <PhonePointer
                  isRunning={true}
                  elementRef={this.getElementRef()}
                  phoneInnerRef={this.phoneInnerRef}
                  animationFrame={animationFrames[currentFrameIndex]}
                  onAnimationFrameEnd={this.handleAnimationFrameEnd}
                  animationSpeed={animationSpeed ? animationSpeed : 1}
                />
                <PhoneAudio
                  currentSong={song}
                  play={songPlay}
                  volume={songVolume}
                />
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Phone;
