import React from "react";

type CardGenresProps = {
  inputId: number;
  isHover: boolean;
  inputRef?: React.RefObject<HTMLDivElement>;
  className?: string;
  style?: {};
};
type CardGenresState = {};

export class CardGenres extends React.Component<
  CardGenresProps,
  CardGenresState
> {
  constructor(props: CardGenresProps) {
    super(props);
  }

  render() {
    const { inputRef, className, style, isHover } = this.props;
    return (
      <div className="search-button-box" ref={inputRef}>
        <button
          className={`search-button ${className} ${isHover ? `_hover` : ``}`}
          style={style}
        >
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default CardGenres;
