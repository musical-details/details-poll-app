import React from "react";

type ReactionRangerProps = {};
type ReactionRangerState = {};

class ReactionRanger extends React.Component<
  ReactionRangerProps,
  ReactionRangerState
> {
  state: ReactionRangerState = {};

  constructor(props: ReactionRangerProps) {
    super(props);
  }

  render() {
    return (
      <div className="reaction-ranger">
        <div className="ranger-pointer">
          <div className="inner"></div>
        </div>
        <div className="ranger-icon left">
          <i className="icon-thumbs-down"></i>
        </div>

        <div className="ranger-icon right">
          <i className="icon-thumbs-up"></i>
        </div>
      </div>
    );
  }
}

export default ReactionRanger;
