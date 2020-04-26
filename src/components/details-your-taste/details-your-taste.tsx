import React from "react";
import "./details-your-taste.scss";
import Phone, { Elements, PhoneAnimationFrame } from "../phone/phone";
import Map from "./helpers/map/map";
import VibeBox from "./helpers/vibe-box/vibe-box";
import DetailsLogo from "../details-logo/details-logo";
import deatilsTasteAnimations from "../../assets/data/@details-taste-animations.json";
import detailsTasteSongs from "../../assets/data/@details-taste-songs.json";

export type MapBaloon = {
  name: string;
  level: number;
};

export type Song = {
  author: string;
  title: string;
  cover: string;
  coverTheme: Array<string>;
  audioUrl: string | null;
  basicStartTime: number;
  moods: Array<MapBaloon>;
  genres: Array<MapBaloon>;
  moments: Array<SongMoment>;
};

export type SongMoment = {
  name: string;
  color: string;
  startTime: number;
  durationTime: number;
  message: string;
  moods: Array<MapBaloon>;
  sounds: Array<MapBaloon>;
};

type DetailsYourTastePreviewProps = {};
type DetailsYourTastePreviewState = {
  vibeBoxExtended: boolean;
  currentSongIndex: number;
};

class DetailsYourTastePreview extends React.Component<
  DetailsYourTastePreviewProps,
  DetailsYourTastePreviewState
> {
  elements: Elements = {
    button_like_it: React.createRef(),
    button_not_like_it: React.createRef(),
  };
  state: DetailsYourTastePreviewState = {
    vibeBoxExtended: false,
    currentSongIndex: 0,
  };

  constructor(props: DetailsYourTastePreviewProps) {
    super(props);
  }

  handleBasicRate = (isLiked: boolean) => {
    if (!isLiked) {
      /* inny utwór */ return;
    }
    this.setState({
      vibeBoxExtended: true,
    });
  };

  render() {
    const { vibeBoxExtended, currentSongIndex } = this.state;
    return (
      <Phone
        animationFrames={
          deatilsTasteAnimations["house"] as Array<PhoneAnimationFrame>
        }
        elements={this.elements}
        animate={true}
      >
        <div className="details-your-taste">
          <div className="logo-wrapper">
            <DetailsLogo moduleName="Your Taste" />
          </div>
          <div className="map-wrapper">
            <Map />
          </div>
          <div className="vibe-box-wrapper">
            <VibeBox
              elements={this.elements}
              isExtend={vibeBoxExtended}
              onBasicRate={this.handleBasicRate}
              song={detailsTasteSongs["house"][currentSongIndex]}
            />
          </div>
        </div>
      </Phone>
    );
  }
}

export default DetailsYourTastePreview;
