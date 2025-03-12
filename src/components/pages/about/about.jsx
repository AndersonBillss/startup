import React from "react";
import '../../../styles.css'
import './about.css'
import Navbar from "../../shared/nav/nav"
import MobileGamePad from "../game/MobileGamePad"

export default function About(){
    return(
        <>
            <Navbar></Navbar>
            <div className="page about-page">
                <div className="main underlined title">
                    <span className="primary-color">War</span>
                    <span className="secondary-color">Lab</span>
                </div>
                <h2 className="title underlined center">About</h2>
                <p className="about-paragraph">
                    War Lab is a battle simulator where you perform tasks and puzzles to defeat your enemies. Select a name and background for your kingdom and employ intricate strategies to win the game. 
                </p>
                <p className="about-paragraph">
                    This website centers around games. There are several different games you can play to earn soldiers. More expensive games are more profitable but require a greater amount of skill to play. As you earn soldiers, you can attack others. When you attack another player, you elimate half of their army (rounded up). 
                </p>
                <h2 className="title underlined center">How the Controls Work</h2>
                <p className="about-paragraph">
                    Some games in this website use this control pad. This allows mobile users to play the games on this site.
                </p>
                <MobileGamePad />
                <p className="about-paragraph">
                    If you are playing on a device without a touchscreen, you will do a lot better by using arrow keys or the W A S D keys for the directional inputs and spacebar for the middle button input.
                </p>
            </div>
        </>
    )
}