import React from "react";
import "./speedometer.scss";

type SpeedometerProps = {};
type SpeedometerState = {};

class Speedometer extends React.Component<SpeedometerProps, SpeedometerState> {
  constructor(props: SpeedometerProps) {
    super(props);
  }

  render() {
    return (
      <div className="speedometer">
        <svg width="70" height="70" viewBox="0 0 400 342">
          <defs>
            <linearGradient id="a" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#b74fa1"></stop>
              <stop offset="100%" stopColor="#f84824"></stop>
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="c" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="50%" stopColor="#fff"></stop>
              <stop offset="90%" stopColor="rgba(255,255,255,0)"></stop>
            </linearGradient>
          </defs>
          <defs>
            <filter width="200%" height="200%" x="0" y="0">
              <feOffset in="SourceGraphic" result="offOut"></feOffset>
              <feGaussianBlur
                in="matrixOut"
                result="blurOut"
                stdDeviation="25"
              ></feGaussianBlur>
              <feBlend in="SourceGraphic" in2="blurOut"></feBlend>
            </filter>
          </defs>
          <defs>
            <filter id="b" x="0" y="0">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="7"
              ></feGaussianBlur>
            </filter>
          </defs>
          <path
            style={{
              WebkitTransformOrigin: 180,

              transformOrigin: 180,
            }}
            fill="none"
            fillRule="evenodd"
            stroke="url(#a)"
            strokeMiterlimit="1"
            strokeOpacity="0.05"
            strokeWidth="52"
            d="M66.906 293.337a160.11 160.11 0 010-226.428 160.11 160.11 0 01226.429 0 160.11 160.11 0 010 226.428"
            filter="url(#b)"
            transform="scale(.9)"
          ></path>
          <path
            fill="none"
            fillRule="evenodd"
            stroke="#223050"
            strokeMiterlimit="4"
            strokeOpacity="0.5"
            strokeWidth="38"
            d="M66.906 293.337a160.11 160.11 0 010-226.428 160.11 160.11 0 01226.429 0 160.11 160.11 0 010 226.428"
          ></path>
          <path
            fill="none"
            fillRule="evenodd"
            stroke="url(#a)"
            strokeMiterlimit="4"
            strokeWidth="40"
            d="M66.906 293.337a160.11 160.11 0 010-226.428 160.11 160.11 0 01226.429 0 160.11 160.11 0 010 226.428"
          ></path>
          <path
            fill="url(#c)"
            style={{
              WebkitTransformOrigin: 59,

              transformOrigin: 59,
            }}
            fillOpacity="0.9"
            d="M180 168L180 192 65 188 65 172z"
          ></path>
          <path d="M180 14L180 26" transform="rotate(226 180 180)"></path>
          <path d="M180 14L180 26" transform="rotate(270 180 180)"></path>
          <path d="M180 14L180 26" transform="rotate(315 180 180)"></path>
          <path d="M180 14L180 26" transform="rotate(405 180 180)"></path>
          <path d="M180 14L180 26" transform="rotate(450 180 180)"></path>
          <path d="M180 14L180 26" transform="rotate(494 180 180)"></path>
          <path d="M180 14L180 26"></path>
          <text x="85" y="275">
            0
          </text>
          <text x="50" y="187">
            5
          </text>
          <text x="82" y="100">
            10
          </text>
          <text x="170" y="60">
            15
          </text>
          <text x="255" y="100">
            20
          </text>
          <text x="292" y="187">
            25
          </text>
          <text x="255" y="275">
            30
          </text>
        </svg>
      </div>
    );
  }
}

export default Speedometer;
