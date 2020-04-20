import React from "react";
import Card, { CardButton } from "./card";
import "./card-sounds.scss";
import "./sound-description.scss";

import musicSounds from "../../assets/data/sounds.json";

type CardSoundsProps = {
  hidden: boolean;
};
type CardSoundsState = {};

export class CardSounds extends React.Component<
  CardSoundsProps,
  CardSoundsState
> {
  constructor(props: CardSoundsProps) {
    super(props);
  }

  render() {
    const { hidden } = this.props;
    return (
      <Card title="Select sounds" hidden={hidden}>
        <div className="card-sounds">
          <div className="sound-slots">
            <div className="slot">
              <SoundDescription slot={{ name: "Groove Bass", level: 100 }} />
            </div>
            <div className="slot">
              <SoundDescription slot={{ name: "Pure Piano", level: 70 }} />
            </div>
            <div className="slot">
              <SoundDescription
                slot={{ name: "Electronic Drums", level: 30 }}
              />
            </div>
          </div>
          <div className="sound-options">
            {Object.keys(musicSounds).map((e) => (
              <div className={`option ${e === "bass" ? "_selected" : ""}`}>
                <div className="icon">
                  <div className={`inner ${e}`}></div>
                </div>
                <div className="name">{e}</div>
              </div>
            ))}
          </div>
          <div className="sound-details">
            {musicSounds.bass.details.map((e) => (
              <div className="card-button detail">{e}</div>
            ))}
          </div>
        </div>
      </Card>
    );
  }
}

type SoundDescriptionProps = {
  slot: { name: string; level: number };
};
type SoundDescriptionState = {};

export class SoundDescription extends React.Component<
  SoundDescriptionProps,
  SoundDescriptionState
> {
  constructor(props: SoundDescriptionProps) {
    super(props);
  }

  renderBlocks = (count: number = 10): Array<JSX.Element> => {
    let blocks: Array<JSX.Element> = [];
    for (let i = 0; i < count; ++i) {
      blocks.push(
        <div className="block">
          <div className="inner"></div>
        </div>
      );
    }
    return blocks;
  };

  render() {
    const { slot } = this.props;
    return (
      <div className="sound-description">
        <div>
          <div className="bar-box">
            <div className="bar" style={{ height: `${slot.level}%` }}></div>
          </div>
          <div className="name-box">
            <div className="name">{slot.name}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardSounds;
