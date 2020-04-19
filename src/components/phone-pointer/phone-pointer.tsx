import React from "react";
import "./phone-pointer.scss";

type PhonePointerProps = {
  moveToRef: React.RefObject<HTMLDivElement> | null;
  onMoveStart?: () => void;
  onMoveStop?: () => void;
};
type PhonePointerState = {
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
  timeout: NodeJS.Timeout | any;

  state: PhonePointerState = {
    x: 0,
    y: 0,
  };

  constructor(props: PhonePointerProps) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.move();
    }, 100);
  }

  componentDidUpdate(oldProps: PhonePointerProps) {
    if (oldProps.moveToRef !== this.props.moveToRef) {
      this.move();
    }
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

  move() {
    if (this.props.moveToRef === null) return;
    if (this.props.moveToRef.current === null) return;
    this.props.onMoveStart && this.props.onMoveStart();
    const {
      offsetLeft,
      offsetTop,
      offsetWidth,
      offsetHeight,
    } = this.props.moveToRef.current;

    const middle: { x: number; y: number } = this.getMiddle(
      offsetLeft,
      offsetTop,
      offsetWidth,
      offsetHeight
    );

    this.setState({
      x: middle.x,
      y: middle.y,
    });

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.onMoveStop && this.props.onMoveStop();
    }, PhonePointer.moveDuration);
  }

  render() {
    const { x, y } = this.state;
    return (
      <div
        className="phone-pointer"
        style={{ transform: `translate(${x}px, ${y}px)` }}
      >
        <div className="inner"></div>
      </div>
    );
  }
}

export default PhonePointer;
