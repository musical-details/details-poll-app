import React from "react";
import Card, { CardButton } from "./card";
import musicGenres from "../../assets/data/genres.json";
import musicSubgenres from "../../assets/data/sub-genres.json";
import { Elements } from "../phone/phone";

type CardMoodsProps = {
  elements: Elements;
  hidden: boolean;
  onHide: () => void;
};
type CardMoodsState = {};

export class CardMoods extends React.Component<CardMoodsProps, CardMoodsState> {
  constructor(props: CardMoodsProps) {
    super(props);
  }

  render() {
    const { hidden, onHide, elements } = this.props;
    return (
      <Card
        title="Select mood"
        closeRef={elements["button_close_mood_card"]}
        hidden={hidden}
        onHide={onHide}
      ></Card>
    );
  }
}

export default CardMoods;
