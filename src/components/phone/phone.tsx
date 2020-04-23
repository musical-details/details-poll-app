import React from "react";
import "./phone.scss";
import PhonePointer from "../phone-pointer/phone-pointer";
import PhoneAudio, { Song } from "../phone-audio/phone-audio";
import SpinnerComponent from "../details-spinner/spinner";

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
  pending?: boolean;
  onPendingSwitchPage?: () => void;
  onPendingDone?: () => void;
  song?: Song;
  songPlay?: boolean;
  songVolume?: number;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
};

type PhoneState = {
  currentFrameIndex: number;
  pendingProgress: number;
};

class Phone extends React.Component<PhoneProps, PhoneState> {
  static readonly defaultMoveDuration: number = 900;
  static readonly defaultStandDuration: number = 500;
  pendingSwitchPageTimeout: NodeJS.Timeout | any;
  pendingProgressInterval: NodeJS.Timeout | any;
  pendingDoneTimeout: NodeJS.Timeout | any;
  phoneInnerRef: React.RefObject<HTMLDivElement> = React.createRef();
  state: PhoneState = {
    currentFrameIndex: 0,
    pendingProgress: 0,
  };

  constructor(props: PhoneProps) {
    super(props);
  }

  componentDidMount() {
    const { animate } = this.props;
    if (!animate) return;
  }

  componentDidUpdate(oldProps: PhoneProps) {
    const { animate, pending, onPendingDone, onPendingSwitchPage } = this.props;
    if (oldProps.animate === animate && oldProps.pending === pending) return;

    if (!animate) return;
    if (!pending) return;
    clearInterval(this.pendingProgressInterval);

    this.pendingProgressInterval = setInterval(() => {
      const { pendingProgress } = this.state;
      if (pendingProgress + 2 <= 100) {
        this.setState({
          pendingProgress: pendingProgress + 4,
        });
      } else {
        onPendingSwitchPage && onPendingSwitchPage();
        clearInterval(this.pendingProgressInterval);
        this.pendingDoneTimeout = setTimeout(() => {
          onPendingDone && onPendingDone();
        }, 1000);
      }
    }, 80);
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
      pending,
    } = this.props;

    const { currentFrameIndex, pendingProgress } = this.state;

    return (
      <div className="search-engine-preview">
        <div className="phone-mock">
          <div className="phone-area">
            <div className="phone-outer"></div>
            <div className="phone-safe"></div>
            <div className="phone-inner">
              <div className="phone-inner-body" ref={this.phoneInnerRef}>
                {pending && (
                  <div
                    className="phone-pending-body fadeIn"
                    style={{ opacity: 1 }}
                  >
                    <SpinnerComponent progress={pendingProgress} />
                  </div>
                )}
                <PhonePointer
                  isRunning={this.props.animate}
                  elementRef={this.getElementRef()}
                  phoneInnerRef={this.phoneInnerRef}
                  animationFrame={animationFrames[currentFrameIndex]}
                  onAnimationFrameEnd={this.handleAnimationFrameEnd}
                  animationSpeed={animationSpeed ? animationSpeed : 1}
                />
                <PhoneAudio
                  animationFrames={animationFrames}
                  currentSong={song}
                  play={this.props.animate}
                  volume={songVolume}
                  defaultMoveDuration={Phone.defaultMoveDuration}
                  defaultStandDuration={Phone.defaultStandDuration}
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
