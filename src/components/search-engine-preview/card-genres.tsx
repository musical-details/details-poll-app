import React from "react";
import Card, { CardButton } from "./card";
import musicGenres from "../../assets/data/genres.json";
import musicSubgenres from "../../assets/data/sub-genres.json";
import { Elements } from "../phone/phone";

type CardGenresProps = {
  elements: Elements;
  hidden: boolean;
  onHide: () => void;
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
              buttonRef={elements["button_electronic"]}
              isSelect={false}
            >
              Electronic
            </CardButton>
            <CardButton buttonRef={elements["button_natural"]} isSelect={false}>
              Natural
            </CardButton>
          </div>
        </div>
        <div className="card-part">
          <div className="card-header">What genre?</div>
          <div className="card-buttons fragment">
            {musicGenres.map((e) => (
              <CardButton
                buttonRef={elements[`button_${e.key}`]}
                isSelect={false}
                className="mini"
              >
                {e.name}
              </CardButton>
            ))}
          </div>
        </div>
        <div className="card-part">
          <div className="card-header">What sub-genre?</div>
          <div className="card-buttons fragment _2">
            {musicSubgenres.map((e) => (
              <CardButton isSelect={false} className="mini">
                {e.name}
              </CardButton>
            ))}
          </div>
        </div>
      </Card>
    );
  }
}

export default CardGenres;
