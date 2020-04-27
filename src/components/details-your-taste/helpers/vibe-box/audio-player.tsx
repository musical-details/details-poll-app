import React from "react";
import { Song } from "../../details-your-taste";
import { sleep } from "../../../../utils";

type AudioPlayerProps = {
  play: boolean;
  song: Song;
  stage: "basic" | number;
  onDropTime?: () => void;
};
type AudioPlayerState = {
  currentTime: number;
};

class AudioPlayer extends React.Component<AudioPlayerProps, AudioPlayerState> {
  audio: HTMLAudioElement = new Audio();
  state: AudioPlayerState = {
    currentTime: 0,
  };

  constructor(props: AudioPlayerProps) {
    super(props);
  }

  componentDidMount() {
    const { play } = this.props;
    if (!play) return;
    this.play();
  }

  componentDidUpdate() {
    const { song } = this.props;
  }

  play() {
    const { song, onDropTime } = this.props;

    if (song.audioUrl === null) return;
    this.audio = new Audio(`audio/${song.audioUrl}`);
    this.audio.currentTime = song.basicStartTime;
    this.audio.volume = 0;
    this.audio.play();

    this.audio.ontimeupdate = () => {
      this.setState({
        currentTime: this.audio.currentTime,
      });
    };

    this.audio.onplay = () => {
      this.fadeIn();

      setTimeout(() => {
        onDropTime && onDropTime();
      }, (song.basicDropTime - song.basicStartTime) * 1000);
    };
  }

  fadeIn = async () => {
    const { audio } = this;
    const volumeCharge: number = 0.05;
    while (audio.volume + volumeCharge <= 1) {
      audio.volume += volumeCharge;
      await sleep(120);
    }
  };

  fadeOut = async () => {
    const { audio } = this;
    const volumeCharge: number = 0.05;
    while (audio.volume - volumeCharge >= 0) {
      audio.volume -= volumeCharge;
      await sleep(100);
    }
  };

  render() {
    const { currentTime } = this.state;
    return <div className="audio-player">{currentTime}</div>;
  }
}

export default AudioPlayer;
