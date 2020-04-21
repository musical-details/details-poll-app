import React from "react";
import "./card.scss";

type CardProps = {
  closeRef?: React.RefObject<HTMLDivElement>;
  hidden: boolean;
  onHide?: () => void;
  title?: string;
};
type CardState = {
  hidding: boolean;
};

export class Card extends React.Component<CardProps, CardState> {
  state: CardState = {
    hidding: false,
  };
  constructor(props: CardProps) {
    super(props);
  }

  componentDidUpdate(oldProps: CardProps) {
    if (oldProps.hidden !== this.props.hidden) {
    }
  }

  handleCloseClick = () => {
    this.setState({
      hidding: true,
    });

    setTimeout(() => {
      const { onHide } = this.props;

      onHide && onHide();
      this.setState({
        hidding: false,
      });
    }, 1100);
  };

  render() {
    const { hidden, closeRef } = this.props;
    const { hidding } = this.state;
    return (
      !hidden && (
        <div className={`card ${hidding ? `_hidding` : ""}`}>
          <div className="close-box">
            <div ref={closeRef} onClick={this.handleCloseClick}>
              <i className="icon-cancel"></i>
            </div>
          </div>
          <div className="title-box">
            <span>{this.props.title}</span>
          </div>
          <div className="content-box">{this.props.children}</div>
        </div>
      )
    );
  }
}

type CardButtonProps = {
  isSelect: boolean;
  className?: string;
  buttonRef?: React.RefObject<HTMLDivElement>;
};
type CardButtonState = {
  isSelect: boolean;
};

export class CardButton extends React.Component<
  CardButtonProps,
  CardButtonState
> {
  state: CardButtonState = {
    isSelect: false,
  };
  constructor(props: CardButtonProps) {
    super(props);
  }

  handleClick = () => {
    this.setState({
      isSelect: !this.state.isSelect,
    });
  };

  render() {
    const { children, className, buttonRef } = this.props;
    const { isSelect } = this.state;
    return (
      <div
        ref={buttonRef}
        onClick={this.handleClick}
        className={`card-button ${className} ${isSelect ? "_select" : ""}`}
      >
        {children}
      </div>
    );
  }
}

export default Card;
