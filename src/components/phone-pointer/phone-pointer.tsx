import React from "react";
import "./phone-pointer.scss";
import { PhoneAnimationFrame } from "../phone/phone";

type PhonePointerProps = {
  isRunning: boolean;
  animationFrame: PhoneAnimationFrame;
  phoneInnerRef: React.RefObject<HTMLDivElement>;
  onAnimationFrameStart?: () => void;
  onAnimationFrameMoveStart?: () => void;
  onAnimationFrameMoveEnd?: () => void;
  onAnimationFrameStandingStart?: () => void;
  onAnimationFrameStandingEnd?: () => void;
  onAnimationFrameEnd?: () => void;
};
type PhonePointerState = {
  previousElement: null | React.RefObject<HTMLDivElement>;
  currentEvent: null | "click";
  x: number;
  y: number;
};

class PhonePointer extends React.Component<
  PhonePointerProps,
  PhonePointerState
> {
  static readonly width: number = 30;
  static readonly height: number = 30;
  static readonly moveDuration: number = 900;
  moveEndTimeout: NodeJS.Timeout | any;
  standEndTimeout: NodeJS.Timeout | any;
  eventEndTimeout: NodeJS.Timeout | any;

  state: PhonePointerState = {
    previousElement: null,
    currentEvent: null,
    x: 0,
    y: 0,
  };

  constructor(props: PhonePointerProps) {
    super(props);
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate(oldProps: PhonePointerProps) {
    const { isRunning, animationFrame } = this.props;
    if (
      oldProps.isRunning !== isRunning ||
      oldProps.animationFrame !== animationFrame
    ) {
      this.animate();
    }
  }

  animate() {
    const { isRunning, onAnimationFrameStart } = this.props;
    if (!isRunning) return;
    onAnimationFrameStart && onAnimationFrameStart();
    setTimeout(() => {
      this.move();
    }, 1);
  }

  getMiddle = (
    offsetLeft: number,
    offsetTop: number,
    offsetWidth: number,
    offsetHeight: number
  ): { x: number; y: number } => {
    return {
      x: offsetLeft + offsetWidth / 2 - PhonePointer.width / 2,
      y: offsetTop + offsetHeight / 2 - PhonePointer.height / 2,
    };
  };

  setPositionFromCords = (position: { x: number; y: number }): void => {
    this.setState({
      x: position.x,
      y: position.y,
    });
  };

  setPositionFromElement = (position: {
    element: React.RefObject<HTMLDivElement>;
  }): void => {
    const { phoneInnerRef } = this.props;
    if (position.element.current === null) return;
    if (phoneInnerRef.current === null) return;

    const { offsetWidth, offsetHeight } = (position as {
      element: React.RefObject<HTMLDivElement>;
    }).element.current as HTMLDivElement;

    const phoneInnerRect: DOMRect = (phoneInnerRef.current as HTMLDivElement).getBoundingClientRect();

    const elementRect: DOMRect = ((position as {
      element: React.RefObject<HTMLDivElement>;
    }).element.current as HTMLDivElement).getBoundingClientRect();

    const middle: { x: number; y: number } = this.getMiddle(
      elementRect.x - phoneInnerRect.x,
      elementRect.y - phoneInnerRect.y,
      offsetWidth,
      offsetHeight
    );

    this.setState({
      x: middle.x,
      y: middle.y,
    });
  };

  addHover = (position: { element: React.RefObject<HTMLDivElement> }): void => {
    if (position.element.current === null) return;
    position.element.current.classList.add("_hover");
  };

  removeHover = (position: {
    element: React.RefObject<HTMLDivElement>;
  }): void => {
    if (position.element.current === null) return;
    position.element.current.classList.remove("_hover");
  };

  move() {
    const {
      animationFrame,
      onAnimationFrameMoveStart,
      onAnimationFrameMoveEnd,
    } = this.props;
    const { position } = animationFrame;
    if (position.hasOwnProperty("x") && position.hasOwnProperty("y")) {
      this.setPositionFromCords(position as { x: number; y: number });
    } else if (position.hasOwnProperty("element")) {
      const elementPosition: {
        element: React.RefObject<HTMLDivElement>;
      } = position as { element: React.RefObject<HTMLDivElement> };

      this.setPositionFromElement(elementPosition);
      this.addHover(elementPosition);
    }

    onAnimationFrameMoveStart && onAnimationFrameMoveStart();

    clearTimeout(this.moveEndTimeout);
    this.moveEndTimeout = setTimeout(() => {
      onAnimationFrameMoveEnd && onAnimationFrameMoveEnd();
      this.stand();
    }, PhonePointer.moveDuration);
  }

  clickToElement = (position: {
    element: React.RefObject<HTMLDivElement>;
  }): void => {
    const { currentEvent } = this.state;
    if (position.element.current === null) return;
    position.element.current.click();
  };

  stand() {
    const {
      onAnimationFrameStandingStart,
      onAnimationFrameStandingEnd,
    } = this.props;

    onAnimationFrameStandingStart && onAnimationFrameStandingStart();

    clearTimeout(this.standEndTimeout);
    this.standEndTimeout = setTimeout(() => {
      onAnimationFrameStandingEnd && onAnimationFrameStandingEnd();
      this.callEvent();
    }, PhonePointer.moveDuration);
  }

  callEvent() {
    const { onAnimationFrameEnd, animationFrame } = this.props;
    const { position } = animationFrame;

    this.setState({
      currentEvent: animationFrame.eventName,
    });

    clearTimeout(this.eventEndTimeout);
    switch (this.state.currentEvent) {
      case "click":
        this.clickToElement(
          position as { element: React.RefObject<HTMLDivElement> }
        );

        this.eventEndTimeout = setTimeout(() => {
          onAnimationFrameEnd && onAnimationFrameEnd();
        }, 500);
        break;
      default:
        onAnimationFrameEnd && onAnimationFrameEnd();
        break;
    }
  }

  render() {
    const { currentEvent, x, y } = this.state;
    return (
      <div
        className="phone-pointer-wrapper"
        style={{
          transitionDuration: `${PhonePointer.moveDuration}ms`,
          transform: `translate(${x}px, ${y}px)`,
        }}
      >
        <div className={`pointer _${currentEvent}`}>
          <div className="pointer-circle"></div>
        </div>
      </div>
    );
  }
}

export default PhonePointer;
