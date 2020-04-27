import React from "react";
import "./song-cover.scss";

type SongCoverProps = {
  animateCover: boolean;
  coverUrl: string;
  coverTheme?: { firstColor: string; secondColor: string };
  shiftTo?: "left" | "right" | null;
  elementRef?: React.RefObject<HTMLDivElement>;
  likeItRef?: React.RefObject<HTMLDivElement>;
  notLikeItRef?: React.RefObject<HTMLDivElement>;
  className?: string;
  style?: {};
  onLike?: () => void;
  onNotLike?: () => void;
  onClick?: () => void;
};
type SongCoverState = {};

class SongCover extends React.Component<SongCoverProps, SongCoverState> {
  state: SongCoverState = {};

  constructor(props: SongCoverProps) {
    super(props);
  }

  getBackgroundStyle = () => {
    const { coverTheme } = this.props;
    if (coverTheme === undefined) return {};
    return {
      background: `linear-gradient(0deg, ${coverTheme.firstColor}, ${coverTheme.secondColor})`,
    };
  };

  getSongCoverClassName = (): string => {
    const { shiftTo } = this.props;
    if (shiftTo === undefined) return "";
    if (shiftTo === null) return "";
    return shiftTo === "left" ? "like_it" : "not_like_it";
  };

  render() {
    const {
      elementRef,
      coverTheme,
      animateCover,
      likeItRef,
      notLikeItRef,
      style,
      className,
      onLike,
      onNotLike,
      coverUrl,
      onClick,
    } = this.props;
    return (
      <div
        className={`song-cover-static-wrapper ${className}`}
        ref={elementRef}
        onClick={onClick}
        style={style}
      >
        <div className={`song-cover-box ${this.getSongCoverClassName()}`}>
          <div className="controls">
            <div className="like_it" ref={likeItRef} onClick={onLike}></div>
            <div
              className="not_like_it"
              ref={notLikeItRef}
              onClick={onNotLike}
            ></div>
          </div>
          <div
            className={`background ${animateCover ? "drop" : ""}`}
            style={this.getBackgroundStyle()}
          ></div>
          <div className="cover-wrapper">
            <div
              className={`song-cover ${animateCover ? "drop" : ""}`}
              style={{ backgroundImage: `url(${coverUrl})` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default SongCover;
