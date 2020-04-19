import React from "react";
import "./card.scss";

type CardProps = {
  title?: string;
};
type CardState = {};

export class Card extends React.Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <div className="close-box">
          <div>
            <i className="icon-cancel"></i>
          </div>
        </div>
        <div className="title-box">
          <span>{this.props.title}</span>
        </div>
        <div className="content-box">{this.props.children}</div>
      </div>
    );
  }
}

type CardButtonProps = {
  isSelect: boolean;
  className?: string;
};
type CardButtonState = {};

export class CardButton extends React.Component<
  CardButtonProps,
  CardButtonState
> {
  constructor(props: CardButtonProps) {
    super(props);
  }

  render() {
    const { children, className, isSelect } = this.props;
    return (
      <div className={`card-button ${className} ${isSelect ? "_select" : ""}`}>
        {children}
      </div>
    );
  }
}

export default Card;
