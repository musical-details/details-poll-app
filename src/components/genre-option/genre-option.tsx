import React from "react";
import "./genre-option.scss";
import { MusicApplication, MusicGenre } from "../../App";

type GenreOptionProps = {
  genre: MusicGenre;
  disabled?: boolean;
  className?: string;
  style?: {};
  onSelect?: (selectedGenre: MusicGenre) => void;
  onUnselect?: (unselectedGenre: MusicGenre) => void;
};

type GenreOptionState = {
  isSelected: boolean;
};

class GenreOption extends React.Component<GenreOptionProps, GenreOptionState> {
  state: GenreOptionState = {
    isSelected: false,
  };

  constructor(props: GenreOptionProps) {
    super(props);
  }

  handleOptionClick = () => {
    const { genre, onSelect, onUnselect } = this.props;
    this.setState({ isSelected: !this.state.isSelected }, () => {
      this.state.isSelected && onSelect && onSelect(genre);
      !this.state.isSelected && onUnselect && onUnselect(genre);
    });
  };

  render() {
    const { disabled, genre, className, style } = this.props;
    const { isSelected } = this.state;
    const selectedClassName: string = isSelected ? "selected" : "";
    return (
      <button
        disabled={disabled}
        className={`genre-wrapper ${selectedClassName}`}
        onClick={this.handleOptionClick}
      >
        <div className="genre">{genre.name}</div>
      </button>
    );
  }
}

export default GenreOption;
