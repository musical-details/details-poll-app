import React from "react";
import Card, { CardButton } from "./card";
import musicGenres from "../../assets/data/genres.json";
import musicSubgenres from "../../assets/data/sub-genres.json";

type CardMoodsProps = {
  hidden: boolean;
};
type CardMoodsState = {};

export class CardMoods extends React.Component<CardMoodsProps, CardMoodsState> {
  constructor(props: CardMoodsProps) {
    super(props);
  }

  render() {
    const { hidden } = this.props;
    return <Card title="Select mood" hidden={hidden}></Card>;
  }
}

export default CardMoods;
