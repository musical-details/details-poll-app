import React from "react";
import Card, { CardButton } from "./card";
import musicGenres from "../../assets/data/genres.json";
import musicSubgenres from "../../assets/data/sub-genres.json";
import { Elements } from "../phone/phone";
import { Genre } from "./search-engine-preview";

type CardGenresProps = {
  elements: Elements;
  hidden: boolean;
  onHide: () => void;
  onSelectGenre?: (genre: Genre) => void;
  onUnselectGenre?: () => void;
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
    const { hidden, onHide, elements } = this.props;
    return (
      <Card
        title="Select genre"
        closeRef={elements["button_close_genre_card"]}
        hidden={hidden}
        onHide={onHide}
      >
        <div className="card-part">
          <div className="card-header">What kind of music?</div>
          <div className="card-buttons">
            <CardButton
              buttonRef={elements["button_genre_electronic"]}
              value={{
                key: "electronic",
                name: "Electronic",
                color: "",
                icon: "",
              }}
              onSelect={this.props.onSelectGenre}
            >
              Electronic
            </CardButton>
            <CardButton
              buttonRef={elements["button_genre_natural"]}
              value={{
                key: "natural",
                name: "Natural",
                color: "",
                icon: "",
              }}
              onSelect={this.props.onSelectGenre}
            >
              Natural
            </CardButton>
          </div>
        </div>
        <div className="card-part">
          <div className="card-header">What genre?</div>
          <div className="card-buttons fragment">
            {musicGenres.map((genre) => (
              <CardButton
                value={genre}
                buttonRef={elements[`button_genre_${genre.key}`]}
                className="mini"
                onSelect={this.props.onSelectGenre}
              >
                {genre.name}
              </CardButton>
            ))}
          </div>
        </div>
        <div className="card-part">
          <div className="card-header">What sub-genre?</div>
          <div className="card-buttons fragment _2">
            {musicSubgenres.map((subGenre) => (
              <CardButton
                value={{
                  key: subGenre.key,
                  name: subGenre.name,
                  color: "",
                  icon: "",
                }}
                buttonRef={elements[`button_genre_${subGenre.key}`]}
                className="mini"
                onSelect={this.props.onSelectGenre}
              >
                {subGenre.name}
              </CardButton>
            ))}
          </div>
        </div>
      </Card>
    );
  }
}

export default CardGenres;
