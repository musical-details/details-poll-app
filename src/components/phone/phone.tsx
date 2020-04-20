import React from "react";
import "./phone.scss";
import PhonePointer from "../phone-pointer/phone-pointer";

export type PhoneAnimationFrame = {
  position:
    | { x: number; y: number }
    | { element: React.RefObject<HTMLDivElement> };
  movingDuration?: number;
  standingDuration?: number;
  eventName: null | "click";
};

type PhoneProps = {
  animationFrames: Array<PhoneAnimationFrame>;
  onPointerMoveStart?: () => void;
  onPointerMoveEnd?: () => void;
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
    this.runAnimation();
  }

  componentDidUpdate() {}

  runAnimation() {}

  render() {
    const {
      animationFrames,
      onPointerMoveStart,
      onPointerMoveEnd,
      children,
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
                  phoneInnerRef={this.phoneInnerRef}
                  animationFrame={animationFrames[currentFrameIndex]}
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
