import React from "react";
import Card, { CardButton } from "./card";
import musicGenres from "../../assets/data/genres.json";
import musicSubgenres from "../../assets/data/sub-genres.json";

type CardGenresProps = {
  hidden: boolean;
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
    const { hidden } = this.props;
    return (
      <Card title="Select genre" hidden={hidden}>
        <div className="card-part">
          <div className="card-header">What kind of music?</div>
          <div className="card-buttons">
            <CardButton isSelect={true}>Electronic</CardButton>
            <CardButton isSelect={false}>Natural</CardButton>
          </div>
        </div>
        <div className="card-part">
          <div className="card-header">What genre?</div>
          <div className="card-buttons fragment">
            {musicGenres.map((e) => (
              <CardButton
                isSelect={e.name == "House" ? true : false}
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
