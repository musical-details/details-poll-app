import React from "react";

type TimelineProps = {};
type TimelineState = {};

class Timeline extends React.Component<TimelineProps, TimelineState> {
  state: TimelineState = {};

  constructor(props: TimelineProps) {
    super(props);
  }

  render() {
    return (
      <div className="timeline">
        <div className="tape">
          <TimelineMoment
            isActive={true}
            section={1}
            startTime={0}
            duration={5}
            backgroundColor={"#35408d"}
          >
            Bass
          </TimelineMoment>
          <TimelineMoment
            isActive={false}
            section={0}
            startTime={0}
            duration={5}
          ></TimelineMoment>
          <TimelineMoment
            isActive={false}
            section={2}
            startTime={0}
            duration={5}
          ></TimelineMoment>
        </div>
      </div>
    );
  }
}

type TimelineMomentProps = {
  isActive: boolean;
  section: 0 | 1 | 2;
  startTime: number;
  duration: number;
  backgroundColor?: string;
};
type TimelineMomentState = {};

class TimelineMoment extends React.Component<
  TimelineMomentProps,
  TimelineMomentState
> {
  state: TimelineMomentState = {};

  constructor(props: TimelineMomentProps) {
    super(props);
  }
  //#35408d
  render() {
    const {
      children,
      isActive,
      section,
      startTime,
      duration,
      backgroundColor,
    } = this.props;
    return (
      <div
        className={`moment ${isActive ? "active" : ""}`}
        style={{
          transform: `translate(${20}px, ${section * 25}px)`,
        }}
      >
        <div className="inner" style={{ backgroundColor: backgroundColor }}>
          <span>{children}</span>
        </div>
      </div>
    );
  }
}

export default Timeline;
