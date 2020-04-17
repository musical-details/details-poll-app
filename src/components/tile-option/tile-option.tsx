import React from "react";
import "./tile-option.scss";
import { MusicApplication } from "../../App";

type TileOptionProps = {
  disabled?: boolean;
  image?: string;
  text?: string;
  style?: {};
  className?: {};
  onSelect?: (selectedApplication: MusicApplication) => void;
  onUnselect?: (unselectedApplication: MusicApplication) => void;
};

type TileOptionState = {
  isSelected: boolean;
};

class TileOption extends React.Component<TileOptionProps, TileOptionState> {
  state: TileOptionState = {
    isSelected: false,
  };

  constructor(props: TileOptionProps) {
    super(props);
  }

  handleOptionClick = () => {
    const { text, image, onSelect, onUnselect } = this.props;
    this.setState({ isSelected: !this.state.isSelected }, () => {
      if (!(text && image)) return;
      this.state.isSelected &&
        onSelect &&
        onSelect({
          name: text,
          logo: image,
        });
      !this.state.isSelected &&
        onUnselect &&
        onUnselect({
          name: text,
          logo: image,
        });
    });
  };

  render() {
    const { disabled, image, text, className, style } = this.props;
    const { isSelected } = this.state;
    const selectedClassName: string = isSelected ? "selected" : "";
    return (
      <button
        disabled={disabled}
        className={`option-wrapper ${selectedClassName}`}
        onClick={this.handleOptionClick}
      >
        <div className="selected-wrapper">
          <div className="selected">
            <i className="icon-ok"></i>
          </div>
        </div>
        <div className={`option ${className}`} style={style}>
          <div className="icon-wrapper">
            <div
              className="icon"
              style={{ backgroundImage: `url('${image}')` }}
            ></div>
          </div>
          <span>{text}</span>
        </div>
      </button>
    );
  }
}

export default TileOption;
