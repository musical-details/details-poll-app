import React from "react";
import "./phone.scss";
import PhonePointer from "../phone-pointer/phone-pointer";

export type Elements = { [key: string]: React.RefObject<HTMLDivElement> };

export type PhoneAnimationFrame = {
  position: { x: number; y: number } | { element: string };
  movingDuration?: number;
  standingDuration?: number;
  eventName: null | "click";
};

type PhoneProps = {
  animationFrames: Array<PhoneAnimationFrame>;
  elements: Elements;
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

  componentDidMount() {}

  componentDidUpdate() {}

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
      onPointerMoveStart,
      onPointerMoveEnd,
      elements,
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
                  elementRef={this.getElementRef()}
                  phoneInnerRef={this.phoneInnerRef}
                  animationFrame={animationFrames[currentFrameIndex]}
                  onAnimationFrameEnd={this.handleAnimationFrameEnd}
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
