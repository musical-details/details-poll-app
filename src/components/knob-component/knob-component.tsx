import React, { useState, MouseEvent, TouchEvent } from "react";
import CSS from "csstype";
import "./knob-component.scss";

type KnobState = {
  deg: number;
  value: number;
};

type KnobProps = {
  size: number;
  numTicks: number;
  degrees: number;
  min: number;
  max: number;
  value: number;
  valueNames: Array<ValueName>;
  onNewValue(newValue: number): void;
};

type pts = {
  x: number;
  y: number;
};

type ValueName = {
  name: string;
  min: number;
  max: number;
};

class Knob extends React.Component<KnobProps, KnobState> {
  state: KnobState = {
    deg: 180,
    value: 50.5,
  };

  fullAngle: number;
  startAngle: number;
  endAngle: number;
  margin: number;
  currentDeg: number;

  constructor(props: KnobProps) {
    super(props);
    this.fullAngle = props.degrees;
    this.startAngle = (360 - props.degrees) / 2;
    this.endAngle = this.startAngle + props.degrees;
    this.margin = props.size * 0.15;
    this.currentDeg = Math.floor(
      this.convertRange(
        props.min,
        props.max,
        this.startAngle,
        this.endAngle,
        this.state.value
      )
    );
    this.state = { deg: this.currentDeg, value: this.state.value };
  }

  convertRange = (
    oldMin: number,
    oldMax: number,
    newMin: number,
    newMax: number,
    oldValue: number
  ) => {
    return (
      ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin
    );
  };

  moveHandlerOperations(): void {
    if (this.currentDeg === this.startAngle) this.currentDeg--;

    let newValue = Math.floor(
      this.convertRange(
        this.startAngle,
        this.endAngle,
        this.props.min,
        this.props.max,
        this.currentDeg
      )
    );
    this.setState({
      deg: this.currentDeg,
      value: newValue,
    });
  }

  startMouseDrag = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const knob = e.currentTarget.getClientRects();
    const pts = {
      x: knob[0].left + knob[0].width / 2,
      y: knob[0].top + knob[0].height / 2,
    };

    const moveMouseHandler: any | EventListener = (e: MouseEvent) => {
      this.currentDeg = this.getDeg(e.clientX, e.clientY, pts);
      this.moveHandlerOperations();
    };

    document.addEventListener("mousemove", moveMouseHandler);
    document.addEventListener("mouseup", (e) => {
      this.props.onNewValue(this.state.value);
      document.removeEventListener("mousemove", moveMouseHandler);
    });
  };

  startTouchDrag = (e: TouchEvent<HTMLDivElement>) => {
    const knob = e.currentTarget.getClientRects();
    const pts = {
      x: knob[0].left + knob[0].width / 2,
      y: knob[0].top + knob[0].height / 2,
    };

    const moveTouchHandler: any | EventListener = (e: TouchEvent) => {
      this.currentDeg = this.getDeg(
        e.touches[0].clientX,
        e.touches[0].clientY,
        pts
      );
      this.moveHandlerOperations();
    };

    document.addEventListener("touchmove", moveTouchHandler);
    document.addEventListener("touchend", (e) => {
      this.props.onNewValue(this.state.value);
      document.removeEventListener("touchmove", moveTouchHandler);
    });
  };

  getDeg = (cX: number, cY: number, pts: pts) => {
    const x = cX - pts.x;
    const y = cY - pts.y;
    let deg = (Math.atan(y / x) * 180) / Math.PI;
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      deg += 90;
    } else {
      deg += 270;
    }
    let finalDeg = Math.min(Math.max(this.startAngle, deg), this.endAngle);
    return finalDeg;
  };

  renderTicks = () => {
    let ticks = [];
    const incr = this.fullAngle / this.props.numTicks;
    for (let deg = this.startAngle; deg <= this.endAngle; deg += incr) {
      const tick = {
        deg: deg,
        ticknobStyle: {
          height: `64%`,
          left: `50%`,
          top: `50%`,
          transform: "rotate(" + deg + "deg)",
          transformOrigin: "top",
        },
      };
      ticks.push(tick);
    }
    return ticks;
  };

  render() {
    let knobBodyStyle: CSS.Properties = {
      transform: `rotate(${this.state.deg}deg)`,
    };

    return (
      <div className="knob-component-wrapper">
        <div className="knob-wrapper">
          <div
            className="knob-body"
            style={knobBodyStyle}
            onMouseDown={this.startMouseDrag}
            onTouchStart={this.startTouchDrag}
          >
            <div className="knob-hollow"></div>
          </div>
          <div className="knob-value-wrapper">
            <div className="knob-value">{Math.floor(this.state.value)}%</div>
          </div>
          <div className="sticks-rating-wrapper">
            <div className="sticks-rating">
              {this.props.numTicks
                ? this.renderTicks().map((tick, i) => (
                    <div className="tick-box" style={tick.ticknobStyle}>
                      <div
                        key={i}
                        className={
                          "tick" +
                          (tick.deg <= this.currentDeg ? " active" : "")
                        }
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="value-name-wrapper">
          <div className="value-name">
            {
              this.props.valueNames.find(
                (valueName) =>
                  valueName.max >= this.state.value &&
                  valueName.min <= this.state.value
              )?.name
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Knob;
