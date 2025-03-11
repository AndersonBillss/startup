import React from "react"
import "./mobileGamepad.css"
export default function MobileGamepad({
    upArrowPress = () => {},
    upArrowUp = () => {},
    upArrowDown = () => {},
    downArrowPress = () => {},
    downArrowUp = () => {},
    downArrowDown = () => {},
    rightArrowPress = () => {},
    rightArrowUp = () => {},
    rightArrowDown = () => {},
    leftArrowPress = () => {},
    leftArrowUp = () => {},
    leftArrowDown = () => {},
    middlePress = () => {},
    middleUp = () => {},
    middleDown = () => {},
}){
    const GameArrow = () => {
        return(
            <svg className="game-arrow" viewBox="0 -960 960 960" fill="#1f1f1f">
                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
            </svg>
        )
    }

    return(
        <div className="gamepad">
            <div className="column">
                <div className="gamepad-row">
                    <div className="game button gamepad-up">
                        <GameArrow />
                    </div>
                </div>
                <div className="gamepad-row">
                    <div className="game button gamepad-left">
                        <GameArrow />
                    </div>
                    <div className="game button gamepad-mid">
                        <div className="gamepad-middle" />
                    </div>
                    <div className="game button gamepad-right">
                        <GameArrow />
                    </div>
                </div>
                <div className="gamepad-row">
                    <div className="game button gamepad-down">
                        <GameArrow />
                    </div>
                </div>
            </div>
        </div>
    )
}