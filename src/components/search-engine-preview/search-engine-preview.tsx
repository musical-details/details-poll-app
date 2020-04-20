import React from "react";
import "./search-engine-preview.scss";
import "./speedometer.scss";
import SearchInput, { SearchButton } from "./search-input";
import Speedometer from "./speedometer";
import PhonePointer from "../phone-pointer/phone-pointer";

import CardGenres from "./card-genres";
import CardMoods from "./card-moods";
import CardSounds from "./card-sounds";
import Phone, { PhoneAnimationFrame } from "../phone/phone";
/*
const animation = [
  {
    position: {x: 0, y: 0},
    duration: 100,
    event: null
  },
  {
    position: {element: refss["input_title"]},
    duration: 400,
    event: "touch"
  },
  {
    position: {x: 0, y: 0},
    duration: 2000,
    event: "touch"
  }
];
*/
type SearchEnginePreviewProps = {};

type SearchEnginePreviewState = {};

class SearchEnginePreview extends React.Component<
  SearchEnginePreviewProps,
  SearchEnginePreviewState
> {
  refCount: number = 9;
  elements: any = {
    input_title: React.createRef(),
    input_genres: React.createRef(),
    input_moods: React.createRef(),
    input_sounds: React.createRef(),
    input_tempo: React.createRef(),
    input_vocal: React.createRef(),
    input_likedby: React.createRef(),
    button_find: React.createRef(),
  };
  state: SearchEnginePreviewState = {};

  animationFrames: Array<PhoneAnimationFrame> = [];

  constructor(props: SearchEnginePreviewProps) {
    super(props);

    this.animationFrames = [
      {
        position: { element: this.elements["input_title"] },
        movingDuration: 100,
        standingDuration: 300,
        eventName: "click",
      },
      {
        position: { element: this.elements["input_tempo"] },
        movingDuration: 400,
        standingDuration: 300,
        eventName: "click",
      },
      {
        position: { x: 0, y: 0 },
        movingDuration: 2000,
        standingDuration: 300,
        eventName: null,
      },
    ];
  }

  componentDidMount() {}

  render() {
    const { elements } = this;
    return (
      <div className="search-engine-preview">
        <Phone animationFrames={this.animationFrames}>
          <div className="search-app">
            <div className="search-body">
              <div className="start-pointer-position"></div>
              <div className="logo-wrapper">
                <div className="logo"></div>
              </div>
              <SearchInput
                inputId={1}
                className="select-genre"
                placeholder="Title or author"
                icon="star"
                inputRef={elements["input_title"]}
              />

              <SearchInput
                inputId={2}
                className="select-genre"
                placeholder="Select genre..."
                icon="bookmark"
                values={[
                  { backgroundColor: "#2f2f2f", name: "House" },
                  { backgroundColor: "#2f2f2f", name: "Techno" },
                ]}
                inputRef={elements["input_genres"]}
              />

              <SearchInput
                inputId={3}
                className="select-mood"
                placeholder="Select mood..."
                icon="emo-laugh"
                values={[
                  { className: "dark", name: "Dark" },
                  { className: "hard", name: "Hard" },
                  { className: "night", name: "Night" },
                ]}
                inputRef={elements["input_moods"]}
              />

              <SearchInput
                inputId={4}
                className="select-genre"
                placeholder="Select important sounds..."
                icon="music"
                values={[
                  { backgroundColor: "#2f2f2f", name: "Groove Bass" },
                  {
                    backgroundColor: "#2f2f2f",
                    name: "Pure Piano",
                  },
                  {
                    backgroundColor: "#2f2f2f",
                    name: "Electronic Drums",
                  },
                ]}
                inputRef={elements["input_sounds"]}
              />
              <div className="tempo-vocal-box">
                <SearchInput
                  inputId={5}
                  className="tempo-input mini"
                  placeholder="Set Tempo..."
                  inputRef={elements["input_tempo"]}
                >
                  <div className="speed-box">
                    <Speedometer />
                  </div>
                </SearchInput>
                <SearchInput
                  inputId={6}
                  className="vocal-input mini"
                  placeholder="Set Vocal..."
                  inputRef={elements["input_vocal"]}
                >
                  <div className="vocal-box">
                    <div>
                      <i className="icon-mic"></i>
                    </div>
                    <div>
                      <i className="icon-mute"></i>
                    </div>
                  </div>
                </SearchInput>
              </div>
              <SearchInput inputId={7} inputRef={elements["input_likedby"]}>
                Test
              </SearchInput>
              <div className="search-button-wrapper">
                <SearchButton inputId={8} inputRef={elements["button_find"]}>
                  Find!
                </SearchButton>
              </div>
            </div>
            <CardGenres hidden={true} />
            <CardMoods hidden={true} />
            <CardSounds hidden={true} />
          </div>
        </Phone>
      </div>
    );
  }
}

export default SearchEnginePreview;
