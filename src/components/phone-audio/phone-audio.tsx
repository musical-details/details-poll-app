import React from "react";
import "./phone-audio.scss";

export type Song = {
  author: string;
  title: string;
  icon: string;
  audioUrl: string | null;
  tags: Array<string>;
};

type PhoneAudioProps = {
  currentSong?: Song;
  play?: boolean;
  volume?: number;
};
type PhoneAudioState = {};

class PhoneAudio extends React.Component<PhoneAudioProps, PhoneAudioState> {
  state: PhoneAudioState = {};
  constructor(props: PhoneAudioProps) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return <div className="phone-audio"></div>;
  }
}

export default PhoneAudio;
