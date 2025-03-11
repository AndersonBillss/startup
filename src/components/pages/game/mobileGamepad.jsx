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
                    <button 
                    className="game button gamepad-up"
                    onMouseDown={upArrowDown}
                    onTouchStart={upArrowDown}
                    onMouseUp={upArrowUp} 
                    onMouseLeave={upArrowUp}
                    onTouchEnd={upArrowUp}
                    onClick={upArrowPress}
                    >
                        <GameArrow />
                    </button>
                </div>
                <div className="gamepad-row">
                    <button 
                    className="game button gamepad-left"
                    onMouseDown={leftArrowDown}
                    onTouchStart={leftArrowDown}
                    onMouseUp={leftArrowUp} 
                    onMouseLeave={leftArrowUp}
                    onTouchEnd={leftArrowUp}
                    onClick={leftArrowPress}
                    >
                        <GameArrow />
                    </button>
                    <button 
                    className="game button gamepad-mid"
                    onMouseDown={middleDown}
                    onTouchStart={middleDown}
                    onMouseUp={middleUp} 
                    onMouseLeave={middleUp}
                    onTouchEnd={middleUp}
                    onClick={middlePress}
                    >
                        <div className="gamepad-middle">
                            <div className="gamepad-hollow" />
                        </div>
                    </button>
                    <button 
                    className="game button gamepad-right"
                    onMouseDown={rightArrowDown}
                    onTouchStart={rightArrowDown}
                    onMouseUp={rightArrowUp} 
                    onMouseLeave={rightArrowUp}
                    onTouchEnd={rightArrowUp}
                    onClick={rightArrowPress}
                    >
                        <GameArrow />
                    </button>
                </div>
                <div className="gamepad-row">
                    <button 
                    className="game button gamepad-down"
                    onMouseDown={downArrowDown}
                    onTouchStart={downArrowDown}
                    onMouseUp={downArrowUp} 
                    onMouseLeave={downArrowUp}
                    onTouchEnd={downArrowUp}
                    onClick={downArrowPress}
                    >
                        <GameArrow />
                    </button>
                </div>
            </div>
        </div>
    )
}