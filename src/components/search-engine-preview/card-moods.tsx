import React from "react";
import "./card-moods.scss";
import Card, { CardButton } from "./card";
import musicMoods from "../../assets/data/moods.json";
import { Elements } from "../phone/phone";
import { Mood } from "./search-engine-preview";

type CardMoodsProps = {
  elements: Elements;
  hidden: boolean;
  onHide: () => void;
  onSelectMood: (mood: Mood) => void;
};
type CardMoodsState = {};

export class CardMoods extends React.Component<CardMoodsProps, CardMoodsState> {
  constructor(props: CardMoodsProps) {
    super(props);
  }

  render() {
    const { hidden, onHide, elements, onSelectMood } = this.props;
    return (
      <Card
        title="Select mood"
        closeRef={elements["button_close_moods_card"]}
        hidden={hidden}
        onHide={onHide}
      >
        <div className="card-moods">
          <div className="mood-blocks">
            {Object.keys(musicMoods).map((theme) => (
              <div className="block">
                <div className="main-color-wrapper">
                  <div
                    className="main-color"
                    style={{
                      backgroundColor: musicMoods[theme as "red"].mainColor,
                    }}
                  ></div>
                </div>
                <div className={`moods ${theme}`}>
                  <div className="shadow"></div>
                  <div className="inner">
                    {musicMoods[theme as "red"].moods.map((mood) => (
                      <CardButton
                        buttonRef={elements[`button_mood_${mood}`]}
                        className="mood"
                        value={
                          {
                            name: mood,
                            color: musicMoods[theme as "red"].shadeColor,
                            textColor: musicMoods[theme as "red"].textColor,
                          } as Mood
                        }
                        onSelect={onSelectMood}
                      >
                        {mood}
                      </CardButton>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }
}

export default CardMoods;
