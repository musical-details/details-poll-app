import React from "react";
import "./result-page.scss";
import { CardButton } from "./card";
import { Song } from "../phone-audio/phone-audio";
import { Elements } from "../phone/phone";

type ResultPageProps = {
  elements: Elements;
  hidden: boolean;
  results: Array<Song>;
  currentSong: Song | null;
  onSelectSong: (song: Song, index: number) => void;
};
type ResultPageState = {};

class ResultPage extends React.Component<ResultPageProps, ResultPageState> {
  state: ResultPageState = {};
  constructor(props: ResultPageProps) {
    super(props);
  }

  render() {
    const { elements, hidden, results, currentSong, onSelectSong } = this.props;
    return (
      !hidden && (
        <div className="result-page">
          <div className="logo-wrapper">
            <div className="logo"></div>
          </div>
          <div className="songs">
            {results.map((song, i) => (
              <ResultSong
                elementRef={elements[`result_song_${i}`]}
                elementLikeRef={elements[`result_song_${i}_like`]}
                index={i}
                song={song}
                onSelect={onSelectSong}
              />
            ))}
          </div>
          <div className="song-player">
            <div className="song-top-wrapper">
              <div className="song-top">
                <div
                  className="song-cover"
                  style={{
                    backgroundImage: `url(${currentSong?.icon})`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div>
                {currentSong?.author} - {currentSong?.title}
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

type ResultSongProps = {
  elementRef: React.RefObject<HTMLDivElement>;
  elementLikeRef: React.RefObject<HTMLDivElement>;
  song: Song;
  index: number;
  onSelect: (song: Song, index: number) => void;
};
type ResultSongState = {
  isLike: boolean;
};

export class ResultSong extends React.Component<
  ResultSongProps,
  ResultSongState
> {
  state: ResultSongState = {
    isLike: false,
  };
  constructor(props: ResultSongProps) {
    super(props);
  }

  render() {
    const { song, index, onSelect, elementRef, elementLikeRef } = this.props;
    const { isLike } = this.state;
    return (
      <div
        ref={elementRef}
        className="song"
        onClick={() => {
          onSelect(song, index);
        }}
      >
        <div className="song-icon-wrapper">
          <div className="song-icon">
            <div
              className="song-icon-src"
              style={{
                backgroundImage: `url(${song.icon})`,
              }}
            ></div>
          </div>
        </div>
        <div className="song-description-wrapper">
          <div className="song-button-wrapper">
            <div
              ref={elementLikeRef}
              className={`song-button ${isLike ? "like" : ""}`}
              onClick={() => {
                this.setState({ isLike: !this.state.isLike });
              }}
            >
              <i className="icon-star"></i>
            </div>
          </div>
          <div className="song-header-wrapper">
            <div className="song-author">{song.author}</div>
            <div className="song-title">{song.title}</div>
          </div>
          <div className="song-other-wrapper">
            {song.tags.map((tag) => (
              <CardButton className="song-tag">{tag}</CardButton>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ResultPage;
