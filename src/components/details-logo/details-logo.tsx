import React from "react";
import "./details-logo.scss";

type DetailsLogoProps = {
  moduleName: string;
};
type DetailsLogoState = {};

class DetailsLogo extends React.Component<DetailsLogoProps, DetailsLogoState> {
  state: DetailsLogoState = {};

  constructor(props: DetailsLogoProps) {
    super(props);
  }

  render() {
    const { moduleName } = this.props;
    return (
      <div className="details-logo">
        <div className="logo"></div>
        <div className="module">
          <div className="inner">{moduleName}</div>
        </div>
      </div>
    );
  }
}

export default DetailsLogo;
