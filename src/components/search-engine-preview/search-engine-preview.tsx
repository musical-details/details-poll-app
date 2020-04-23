import React from "react";
import "./search-engine-preview.scss";
import "./speedometer.scss";
import SearchInput, { SearchButton } from "./search-input";
import Speedometer from "./speedometer";

import musicGenres from "../../assets/data/genres.json";
import musicSubgenres from "../../assets/data/sub-genres.json";
import musicSounds from "../../assets/data/sounds.json";

import animations from "../../assets/data/@search-engine-animations.json";

import CardGenres from "./card-genres";
import CardMoods from "./card-moods";
import CardSounds from "./card-sounds";
import Phone, { PhoneAnimationFrame, Elements } from "../phone/phone";
import searchEngineResults from "../../assets/data/@search-engine-results.json";
import ResultPage from "./result-page";
import { Song } from "../phone-audio/phone-audio";

export type Genre = {
  key: string;
  name: string;
  color: string;
  icon: string;
};

export type Sound = {
  name: string | null;
  detail: string | null;
  level: number | null;
};

type SearchEnginePreviewProps = {
  userSelectedGenre: string;
};

type SearchEnginePreviewState = {
  currentSongIndex: number;
  selectedGenres: Array<Genre>;
  selectedSounds: Array<Sound>;
  cardGenresHidden: boolean;
  cardMoodsHidden: boolean;
  cardSoundsHidden: boolean;
  resultPageHidden: boolean;
};

class SearchEnginePreview extends React.Component<
  SearchEnginePreviewProps,
  SearchEnginePreviewState
> {
  refCount: number = 9;
  elements: Elements = {
    input_title: React.createRef(),
    input_genres: React.createRef(),
    input_moods: React.createRef(),
    input_sounds: React.createRef(),
    input_tempo: React.createRef(),
    input_vocal: React.createRef(),
    input_likedby: React.createRef(),
    button_find: React.createRef(),
    button_close_genre_card: React.createRef(),
    button_close_moods_card: React.createRef(),
    button_close_sounds_card: React.createRef(),
    button_genre_electronic: React.createRef(),
    button_genre_natural: React.createRef(),
    button_add_sound_0: React.createRef(),
    button_up_sound_0: React.createRef(),
    button_down_sound_0: React.createRef(),
    button_add_sound_1: React.createRef(),
    button_up_sound_1: React.createRef(),
    button_down_sound_1: React.createRef(),
    button_add_sound_2: React.createRef(),
    button_up_sound_2: React.createRef(),
    button_down_sound_2: React.createRef(),
    result_song_0: React.createRef(),
    result_song_0_like: React.createRef(),
    result_song_1: React.createRef(),
    result_song_1_like: React.createRef(),
    result_song_2: React.createRef(),
    result_song_2_like: React.createRef(),
  };
  state: SearchEnginePreviewState = {
    currentSongIndex: 0,
    selectedGenres: [],
    selectedSounds: [
      { name: null, detail: null, level: null },
      { name: null, detail: null, level: null },
      { name: null, detail: null, level: null },
    ],
    cardGenresHidden: true,
    cardMoodsHidden: true,
    cardSoundsHidden: true,
    resultPageHidden: true,
  };

  constructor(props: SearchEnginePreviewProps) {
    super(props);

    this.addRefs();
  }

  addRefs = () => {
    musicGenres.forEach((musicGenre) => {
      this.elements[`button_genre_${musicGenre.key}`] = React.createRef();
    });
    musicSubgenres.forEach((musicSubgenre) => {
      this.elements[`button_genre_${musicSubgenre.key}`] = React.createRef();
    });

    Object.keys(musicSounds).forEach((musicSound) => {
      this.elements[`button_sound_${musicSound}`] = React.createRef();
      musicSounds[musicSound as "bass"].details.forEach((musicSoundDetail) => {
        this.elements[
          `button_sound_${musicSound}_${musicSoundDetail}`
        ] = React.createRef();
      });
    });
  };

  componentDidMount() {}

  getInputGenresValues = () =>
    this.state.selectedGenres.map((genre: Genre) => ({
      backgroundColor: "#222222",
      name: genre.name,
    }));

  render() {
    const { elements } = this;
    const { userSelectedGenre } = this.props;
    const { currentSongIndex, selectedSounds } = this.state;
    return (
      <div className="search-engine-preview">
        <Phone
          elements={this.elements}
          animationFrames={animations.house as Array<PhoneAnimationFrame>}
          animationSpeed={1}
          animate={true}
          song={
            searchEngineResults[userSelectedGenre as "house"][currentSongIndex]
          }
          songPlay={true}
          songVolume={1}
        >
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
                onClick={() => {
                  this.setState({
                    cardGenresHidden: false,
                  });
                }}
                icon="bookmark"
                values={this.getInputGenresValues()}
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
                onClick={() => {
                  this.setState({
                    cardMoodsHidden: false,
                  });
                }}
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
                onClick={() => {
                  this.setState({
                    cardSoundsHidden: false,
                  });
                }}
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
            <CardGenres
              elements={this.elements}
              hidden={this.state.cardGenresHidden}
              onHide={() => {
                this.setState({
                  cardGenresHidden: true,
                });
              }}
              onSelectGenre={(newGenre) => {
                this.setState({
                  selectedGenres: [...this.state.selectedGenres, newGenre],
                });
              }}
            />
            <CardMoods
              elements={this.elements}
              hidden={this.state.cardMoodsHidden}
              onHide={() => {
                this.setState({
                  cardMoodsHidden: true,
                });
              }}
            />
            <CardSounds
              elements={this.elements}
              hidden={this.state.cardSoundsHidden}
              selectedSounds={selectedSounds}
              onSelectedSound={({ index, name, level, detail }) => {
                this.setState({
                  selectedSounds: this.state.selectedSounds.map((sound, i) =>
                    i === index
                      ? {
                          ...sound,
                          name: name,
                          detail: detail ? detail : "",
                          level: level ? level : 50,
                        }
                      : sound
                  ),
                });
              }}
              onChangeLvl={(index, newLvl) => {
                this.setState({
                  selectedSounds: this.state.selectedSounds.map((sound, i) =>
                    index === i ? { ...sound, level: newLvl } : sound
                  ),
                });
              }}
              onHide={() => {
                this.setState({
                  cardSoundsHidden: true,
                });
              }}
            />
            <ResultPage
              elements={elements}
              results={searchEngineResults[userSelectedGenre as "house"]}
              currentSong={
                searchEngineResults[userSelectedGenre as "house"][
                  currentSongIndex
                ]
              }
              hidden={this.state.resultPageHidden}
              onSelectSong={(song, i) => {
                this.setState({
                  currentSongIndex: i,
                });
              }}
            />
          </div>
        </Phone>
      </div>
    );
  }
}

export default SearchEnginePreview;
