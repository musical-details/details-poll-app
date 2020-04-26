import React from "react";
import "./vibe-box.scss";
import VibeBoxBasic from "./vibe-box-basic";
import VibeBoxExtend from "./vibe-box-extend";
import { Elements } from "../../../phone/phone";
import { Song } from "../../details-your-taste";

type VibeBoxProps = {
  elements: Elements;
  isExtend: boolean;
  song: Song;
  onBasicRate?: (isLiked: boolean) => void;
};
type VibeBoxState = {};

class VibeBox extends React.Component<VibeBoxProps, VibeBoxState> {
  state: VibeBoxState = {};

  constructor(props: VibeBoxProps) {
    super(props);
  }

  render() {
    const { isExtend, elements, onBasicRate } = this.props;
    return (
      <div className="vibe-box">
        <div className={`vibe-window ${isExtend ? "active" : ""}`}>
          <div className="vibe-box-basic-wrapper">
            {!isExtend && (
              <VibeBoxBasic
                elements={elements}
                onRate={onBasicRate}
                rateStatus={null}
              />
            )}
          </div>
          <div className="vibe-box-extend-wrapper">
            {isExtend && <VibeBoxExtend elements={elements} />}
          </div>

          <div className="song-description">
            <div>
              {"Sem"} - {"Torn"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VibeBox;
