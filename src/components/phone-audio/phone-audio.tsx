import React from "react";
import "./phone-audio.scss";
import { PhoneAnimationFrame } from "../phone/phone";

const eventDuration = {
  click: 500,
  slideUp: 1000,
  slideDown: 1000,
};

export type seconds = number;

export type Song = {
  author: string;
  title: string;
  icon: string;
  audioUrl: string | null;
  dropTime: seconds;
  tags: Array<string>;
};

type PhoneAudioProps = {
  animationFrames: Array<PhoneAnimationFrame>;
  defaultMoveDuration: number;
  defaultStandDuration: number;
  currentSong?: Song;
  play: boolean;
  volume?: number;
};
type PhoneAudioState = {};

class PhoneAudio extends React.Component<PhoneAudioProps, PhoneAudioState> {
  state: PhoneAudioState = {};
  audio: HTMLAudioElement = new Audio();
  constructor(props: PhoneAudioProps) {
    super(props);
  }

  componentDidMount() {
    const { play } = this.props;
    if (!play) return;
    this.run();
  }

  componentDidUpdate(oldProps: PhoneAudioProps) {
    const { play } = this.props;
    if (oldProps.play === play) return;
    if (!play) return;
    this.run();
  }

  countStartAudio = () => {
    const {
      animationFrames,
      currentSong,
      defaultMoveDuration,
      defaultStandDuration,
    } = this.props;
    if (currentSong === undefined) return 0;
    let ms: number = 3000;

    animationFrames.forEach((frame) => {
      const { movingDuration, standingDuration, eventName } = frame;
      ms += movingDuration ? movingDuration : defaultMoveDuration;
      ms += standingDuration ? standingDuration : defaultStandDuration;

      if (eventName !== null) ms += eventDuration[eventName];
    });
    return currentSong.dropTime - ms / 1000;
  };

  run() {
    const { currentSong } = this.props;
    if (currentSong === undefined) return;
    if (currentSong.audioUrl === null) return;
    this.audio = new Audio(`./audio/${currentSong.audioUrl}`);
    this.audio.currentTime = this.countStartAudio();
    this.audio.load();
    this.audio.play();
  }

  render() {
    return <div className="phone-audio"></div>;
  }
}

export default PhoneAudio;
