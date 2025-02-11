import React from "react";
import '../styles.css'

export default function About(){
    return(
        <div className="page">
            <div className="main underlined title">
                <span className="primary-color">War</span>
                <span className="secondary-color">Lab</span>
            </div>
            <h2 className="title center">About</h2>
            <p className="center">
                War Lab is a battle simulator where you perform tasks and puzzles to defeat your enemies. Select a name and background for your kingdom and employ intricate strategies to win the game.
            </p>
        </div>
    )
}