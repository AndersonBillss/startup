import React from "react";
import '../styles.css'
import './earnMoney.css'

export default function EarnMoney(){
    return(
        <div className="page">
            <div className="main title">Welcome, Username!</div> 
            <h2 className="title center">Earn Money</h2>
            <div className="center">[Use third party API to allow users to select the photo for their civilization]</div>
            <div className="center">[kingdom name and background image will be stored in a database]</div>
            <p id="soldiers">Soldiers: </p>
            <button className="column button" id="soldierButton">
                Click to recruit soldiers
                <img className="moneyButton" draggable="false" src="/coin.png"/>
            </button>
        </div>
    )
}