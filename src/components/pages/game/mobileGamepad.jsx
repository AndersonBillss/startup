import React from "react"
import "./mobileGamepad.css"
export default function MobileGamepad({}){

    return(
        <div className="column">
            <div className="gamepad-row">
                <svg className="game-arrow gamepad-up" viewBox="0 -960 960 960" fill="#1f1f1f">
                    <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
                </svg>
            </div>
            <div className="gamepad-row">
                <svg className="game-arrow gamepad-left" viewBox="0 -960 960 960" fill="#1f1f1f">
                    <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
                </svg>
                <div className="gamepad-mid">
        
                </div>
                <svg className="game-arrow gamepad-right" viewBox="0 -960 960 960" fill="#1f1f1f">
                    <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
                </svg>
            </div>
            <div className="gamepad-row">
                <svg className="game-arrow gamepad-down" viewBox="0 -960 960 960" fill="#1f1f1f">
                    <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
                </svg>   
            </div>
            Gamepad works
        </div>
    )
}