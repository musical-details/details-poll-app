import React, { useState, MouseEvent, useImperativeHandle, SyntheticEvent} from "react"
import Moveable from "react-moveable";

import  CSS from "csstype"
import "./knob-component.scss"

type KnobState = {
    target: HTMLDivElement | null,
    angle: number
}

type KnobProps = {}

class Knob extends React.Component<KnobProps, KnobState> {

    knobBodyRef: React.RefObject<HTMLDivElement> = React.createRef();

    state: KnobState = {
        target: null,
        angle: 0
    }

    constructor(props: KnobProps) {
        super(props);

    }
    spacing: number = 2;
    minAngle: number = 0;
    maxAngle: number = 270;

    frame = {
        rotate: 0,
    }

    handleKnobBodyOnDrag = (data: MouseEvent) => {
        //console.log(data.movementX)
//        console.log(data.pageX)
        console.log(data.screenX)
        const countAngle = data.screenX;
        this.setState({
            angle: data.screenX
        })
    }

    setAngle = (): void => {
        this.setState({
            angle: this.state.angle + 2
        })
    }


    render () {
        const area: number = 270/360 * 2*3.14*25;
        let degs: Array<number> = [];

        for (let i = 0; i <= area; ++i) {
            degs.push(i * this.spacing);
            if(i == 30)  console.log(area) 
        }

        let knobBodyStyle: CSS.Properties = {
            transform:`rotate(${this.state.angle}deg)`
        }

        return(
            <div className="knob-component-wrapper">
                <div className="knob-wrapper">  
                    <div 
                        draggable="true"
                        className="knob-body" 
                        ref={this.knobBodyRef} 
                        style={knobBodyStyle}
                        onDrag={this.handleKnobBodyOnDrag}
                    >
                        <div className="knob-hollow"></div>                  
                    </div>
                    <div className="knob-value-wrapper">
                        <div className="knob-value">28%</div>
                    </div>  
                </div>
                <div className="value-name-wrapper">
                    <div className="value-name">słabe bardzo ciekawe</div>
                </div>
                <div className="sticks-rating-wrapper">
                    <div className="sticks-rating">
                            {degs.map((deg, i) => (
                                <div
                                className="stick-box"
                                style={{ transform: `rotate(${deg}deg)`, bottom: i *10 }}
                                >
                                <div className="stick"></div>
                                </div>
                            ))}    
                    </div>
                </div>
                {/* <Moveable
                    className="moveable-knob-body"
                    target={this.state.target}
                    rotatable={true}
                    snappable={true}
                    edge={false}
                   // throttleRotate={0}
                    rotationPosition="left"
                    bounds={this.bounds}
                    onRotate={({ target, beforeDelta, delta }) => {
                        this.frame.rotate += delta;
                        target.style.transform
                            = "rotate(" + this.frame.rotate +  "deg)";
                    }} 
                > </Moveable> */}
            </div>
        )
    }

    componentDidMount() {
        this.setState({
          target: this.knobBodyRef.current
        });
      }
}

export default Knob