import React from "react";
import Card, { CardButton } from "./card";
import "./card-sounds.scss";
import "./sound-description.scss";

import musicSounds from "../../assets/data/sounds.json";
import { Elements } from "../phone/phone";
import { Sound } from "./search-engine-preview";

type CardSoundsProps = {
  elements: Elements;
  hidden: boolean;
  selectedSounds: Array<Sound>;
  onHide: () => void;
  onSelectedSound: (sound: {
    index: number;
    name: string;
    level?: number;
    detail?: string;
  }) => void;
  onChangeLvl: (index: number, newLvl: number) => void;
};
type CardSoundsState = {
  currentSlot: number | null;
  currentSound: string | null;
  currentDetail: string | null;
};

export class CardSounds extends React.Component<
  CardSoundsProps,
  CardSoundsState
> {
  state: CardSoundsState = {
    currentSlot: null,
    currentSound: null,
    currentDetail: null,
  };
  constructor(props: CardSoundsProps) {
    super(props);
  }

  render() {
    const {
      hidden,
      elements,
      onHide,
      selectedSounds,
      onSelectedSound,
      onChangeLvl,
    } = this.props;
    const { currentSlot, currentSound, currentDetail } = this.state;
    return (
      <Card
        title="Select sounds"
        closeRef={elements["button_close_sounds_card"]}
        hidden={hidden}
        onHide={onHide}
      >
        <div className="card-sounds">
          <div className="sound-slots">
            {selectedSounds.map((sound, i) => (
              <div className="slot">
                <SoundDescription
                  index={i}
                  isSelected={currentSlot === i}
                  buttonAddRef={elements[`button_add_sound_${i}`]}
                  buttonUpRef={elements[`button_up_sound_${i}`]}
                  buttonDownRef={elements[`button_down_sound_${i}`]}
                  sound={sound}
                  onSelect={(index: number) => {
                    this.setState({
                      currentSlot: index,
                      currentSound: null,
                      currentDetail: null,
                    });
                  }}
                  onChangeLvl={onChangeLvl}
                />
              </div>
            ))}
          </div>
          <div className="sound-options">
            {Object.keys(musicSounds).map((key) => (
              <SoundOption
                isSelected={currentSound === key}
                buttonRef={elements[`button_sound_${key}`]}
                name={key}
                onSelect={(name) => {
                  this.setState({
                    currentSound: key,
                  });
                  onSelectedSound({
                    index: currentSlot === null ? 0 : currentSlot,
                    name: key,
                  });
                }}
              />
            ))}
          </div>
          <div className="sound-details">
            {musicSounds[currentSound as "bass"] &&
              musicSounds[currentSound as "bass"].details.map((detail) => (
                <CardButton
                  buttonRef={
                    elements[`button_sound_${currentSound as "bass"}_${detail}`]
                  }
                  className={`detail`}
                  value={detail}
                  onSelect={(detail) => {
                    this.setState({
                      currentDetail: detail,
                    });
                    onSelectedSound({
                      index: currentSlot !== null ? currentSlot : 0,
                      name: currentSound !== null ? currentSound : "bass",
                      detail: detail,
                    });
                  }}
                >
                  {detail}
                </CardButton>
              ))}
          </div>
        </div>
      </Card>
    );
  }
}

type SoundOptionProps = {
  name: string;
  isSelected: boolean;
  buttonRef: React.RefObject<HTMLDivElement>;
  onSelect: (name: string) => void;
};
type SoundOptionState = {};

class SoundOption extends React.Component<SoundOptionProps, SoundOptionState> {
  state: SoundOptionState = {};
  constructor(props: SoundOptionProps) {
    super(props);
  }

  render() {
    const { name, onSelect, buttonRef, isSelected } = this.props;
    return (
      <div
        className={`option ${isSelected ? "_selected" : ""}`}
        ref={buttonRef}
        onClick={() => {
          onSelect(name);
        }}
      >
        <div className="icon">
          <div className={`inner ${name}`}></div>
        </div>
        <div className="name">{name}</div>
      </div>
    );
  }
}

type SoundDescriptionProps = {
  index: number;
  isSelected: boolean;
  sound: Sound;
  buttonAddRef: React.RefObject<HTMLDivElement>;
  buttonUpRef: React.RefObject<HTMLDivElement>;
  buttonDownRef: React.RefObject<HTMLDivElement>;
  onSelect: (index: number) => void;
  onChangeLvl: (index: number, newLvl: number) => void;
};
type SoundDescriptionState = {};

export class SoundDescription extends React.Component<
  SoundDescriptionProps,
  SoundDescriptionState
> {
  state: SoundDescriptionState = {};
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
    const {
      sound,
      buttonAddRef,
      buttonUpRef,
      buttonDownRef,
      isSelected,
      onSelect,
      onChangeLvl,
      index,
    } = this.props;
    return (
      <div className="sound-description">
        {sound.name !== null && (
          <div>
            <div className="bar-box">
              <div className="bar-controls">
                <div
                  className="slide-up"
                  ref={buttonUpRef}
                  onClick={() => {
                    if (sound.level === null) return;
                    onChangeLvl(
                      index,
                      sound.level + 15 < 100 ? sound.level + 15 : 100
                    );
                  }}
                ></div>
                <div
                  className="slide-down"
                  ref={buttonDownRef}
                  onClick={() => {
                    if (sound.level === null) return;
                    onChangeLvl(
                      index,
                      sound.level - 15 > 0 ? sound.level - 15 : 0
                    );
                  }}
                ></div>
              </div>
              <div className="bar" style={{ height: `${sound.level}%` }}></div>
            </div>
            <div className="name-box">
              <div className="name">
                {sound.detail} {sound.name}
              </div>
            </div>
          </div>
        )}
        {sound.name === null && (
          <div
            className={`add-button ${isSelected ? "_selected" : ""}`}
            ref={buttonAddRef}
            onClick={() => {
              onSelect(index);
            }}
          >
            <i className="icon-plus"></i>
          </div>
        )}
      </div>
    );
  }
}

export default CardSounds;
