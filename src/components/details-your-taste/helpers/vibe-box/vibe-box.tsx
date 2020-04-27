import React from "react";
import "./vibe-box.scss";
import VibeBoxBasic from "./vibe-box-basic";
import VibeBoxExtend from "./vibe-box-extend";
import { Elements } from "../../../phone/phone";
import { Song } from "../../details-your-taste";
import AudioPlayer from "./audio-player";

type VibeBoxProps = {
  basicRateStatus: boolean | null;
  elements: Elements;
  isExtend: boolean;
  song: Song;
  onBasicRate?: (isLiked: boolean) => void;
};
type VibeBoxState = {
  currentMoment: number;
  wasDrop: boolean;
  isExtend: boolean;
};

class VibeBox extends React.Component<VibeBoxProps, VibeBoxState> {
  isExtendTimeout: NodeJS.Timeout | any;
  state: VibeBoxState = {
    currentMoment: 0,
    wasDrop: false,
    isExtend: false,
  };

  constructor(props: VibeBoxProps) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(oldProps: VibeBoxProps) {
    const { isExtend } = this.props;
    if (isExtend === oldProps.isExtend) return;
    clearTimeout(this.isExtendTimeout);
    this.isExtendTimeout = setTimeout(() => {
      this.setState({ isExtend: isExtend });
    }, 2000);
  }


  render() {
    const { elements, onBasicRate, song, basicRateStatus } = this.props;
    const { isExtend, currentMoment, wasDrop } = this.state;
    return (
      <div className="vibe-box">
        <div className={`vibe-window ${isExtend ? "active" : ""}`}>
          <div className="vibe-box-basic-wrapper">
            {!isExtend && (
              <VibeBoxBasic
                elements={elements}
                onRate={onBasicRate}
                rateStatus={basicRateStatus}
                song={song}
                wasDrop={wasDrop}
              />
            )}
          </div>
          <div className="vibe-box-extend-wrapper">
            {isExtend && (
              <VibeBoxExtend
                elements={elements}
                song={song}
                currentMoment={currentMoment}
              />
            )}
          </div>

          <div className="song-description">
            <AudioPlayer
              play={true}
              song={song}
              stage={isExtend ? currentMoment : "basic"}
              onDropTime={() => {
                this.setState({ wasDrop: true });
              }}
            />
            <div>
              {song.author} - {song.title}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VibeBox;
