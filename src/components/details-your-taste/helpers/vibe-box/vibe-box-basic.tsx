import React from "react";
import { Elements } from "../../../phone/phone";
import { Song } from "../../details-your-taste";
import SongCover from "../song-cover/song-cover";

type VibeBoxBasicProps = {
  wasDrop: boolean;
  elements: Elements;
  rateStatus: boolean | null;
  song: Song;
  onRate?: (isLiked: boolean) => void;
};
type VibeBoxBasicState = {};

class VibeBoxBasic extends React.Component<
  VibeBoxBasicProps,
  VibeBoxBasicState
> {
  state: VibeBoxBasicState = {};

  constructor(props: VibeBoxBasicProps) {
    super(props);
  }

  handleLikeItClick = () => {
    const { onRate } = this.props;
    onRate && onRate(true);
  };

  handleNotLikeItClick = () => {
    const { onRate } = this.props;
    onRate && onRate(false);
  };

  getSongCoverClassName = (rateStatus: boolean | null): string => {
    if (rateStatus === null) return "";
    return rateStatus === true ? "like_it" : "not_like_it";
  };

  render() {
    const { elements, rateStatus, song, wasDrop } = this.props;
    return (
      <div className="basic">
        <div className="message-box">
          <div>Do you like this vibes?</div>
        </div>
        <div className="rate-box">
          <div className="reaction-box">
            <i className="icon-thumbs-down"></i>
          </div>
          <SongCover
            coverUrl={song.cover}
            coverTheme={{
              firstColor: song.coverTheme[0],
              secondColor: song.coverTheme[1],
            }}
            animateCover={wasDrop}
            likeItRef={elements["button_like_it"]}
            notLikeItRef={elements["button_not_like_it"]}
            onLike={this.handleLikeItClick}
            onNotLike={this.handleNotLikeItClick}
          />

          <div className="reaction-box">
            <i className="icon-thumbs-up"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default VibeBoxBasic;
