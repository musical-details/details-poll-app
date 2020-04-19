import React from "react";
import "./search-engine-preview.scss";
import "./sound-description.scss";
import "./speedometer.scss";
import SearchInput from "./search-input";
import Speedometer from "./speedometer";
import PhonePointer from "../phone-pointer/phone-pointer";

type SoundDescriptionProps = {
  slot?: { name: string; level: number };
};
type SoundDescriptionState = {};

class SoundDescription extends React.Component<
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
          <div className="bar">
            <div>{this.renderBlocks()}</div>
          </div>
          <div className="name">
            <div>Groove Bass</div>
          </div>
        </div>
      </div>
    );
  }
}

type SearchEnginePreviewProps = {};

type SearchEnginePreviewState = {
  currentHoverElement: number;
};

class SearchEnginePreview extends React.Component<
  SearchEnginePreviewProps,
  SearchEnginePreviewState
> {
  inputsCount: number = 7;
  inputsRef: Array<React.RefObject<HTMLDivElement>> = [];

  state: SearchEnginePreviewState = {
    currentHoverElement: 0,
  };

  constructor(props: SearchEnginePreviewProps) {
    super(props);
    for (let i = 0; i < this.inputsCount; ++i) {
      this.inputsRef[i] = React.createRef();
    }
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.setState({
        currentHoverElement:
          this.state.currentHoverElement < this.inputsCount - 1
            ? this.state.currentHoverElement + 1
            : 0,
      });
    }, 2500);
  }

  render() {
    const { currentHoverElement } = this.state;
    return (
      <div className="search-engine-preview">
        <div className="phone-mock">
          <div className="phone-area">
            <div className="phone-outer"></div>
            <div className="phone-safe"></div>
            <div className="phone-inner">
              <PhonePointer
                moveToRef={this.inputsRef[currentHoverElement]}
                onMoveStart={() => {}}
                onMoveStop={() => {}}
              />
              <div className="search-app">
                <div className="search-body">
                  <div
                    className="start-pointer-position"
                    ref={this.inputsRef[0]}
                  ></div>
                  <SearchInput
                    inputId={1}
                    isHover={true}
                    className="select-genre"
                    placeholder="Title or author"
                    icon="star"
                    inputRef={this.inputsRef[1]}
                  />

                  <SearchInput
                    inputId={2}
                    isHover={false}
                    className="select-genre"
                    placeholder="Select genre..."
                    icon="bookmark"
                    values={[
                      { backgroundColor: "#0097ff", name: "House" },
                      { backgroundColor: "#56b0ef", name: "Techno" },
                    ]}
                    inputRef={this.inputsRef[2]}
                  />

                  <SearchInput
                    inputId={3}
                    isHover={false}
                    className="select-mood"
                    placeholder="Select mood..."
                    icon="emo-laugh"
                    values={[
                      { className: "dark", name: "Dark" },
                      { className: "hard", name: "Hard" },
                      { className: "night", name: "Night" },
                    ]}
                    inputRef={this.inputsRef[3]}
                  />

                  <SearchInput
                    inputId={4}
                    isHover={false}
                    className="select-genre"
                    placeholder="Select important sounds..."
                    icon="music"
                    values={[
                      { backgroundColor: "#0097ff", name: "Groove Bass" },
                      {
                        backgroundColor: "rgb(220, 224, 88)",
                        name: "Pure Piano",
                      },
                      {
                        backgroundColor: "rgb(255, 86, 231)",
                        name: "Electronic Drums",
                      },
                    ]}
                    inputRef={this.inputsRef[4]}
                  />
                  <div>
                    <SearchInput
                      inputId={5}
                      isHover={false}
                      className="tempo-input mini"
                      placeholder="Set Tempo..."
                      inputRef={this.inputsRef[5]}
                    >
                      <div className="speed-box">
                        <Speedometer />
                      </div>
                    </SearchInput>
                    <SearchInput
                      inputId={6}
                      isHover={false}
                      className="vocal-input mini"
                      placeholder="Set Vocal..."
                      inputRef={this.inputsRef[6]}
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

                  <div className="search-button-wrapper">
                    <button className="search-button">Find!</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchEnginePreview;
