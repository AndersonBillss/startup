import React from "react";
import '../../../styles.css'
import './earnMoney.css'
import { useSoldiers } from "../../../utils/context/SoldiersContext";
import { getUsername } from "../../../utils/storage/localStorage";
import Navbar from "../../shared/nav/nav"

export default function EarnMoney(){
    const { numSoldiers, setNumSoldiers } = useSoldiers()
    return(
        <>
            <Navbar></Navbar>
            <div className="page">
                <div className="main title">Welcome, {getUsername()}!</div> 
                <h2 className="title center">Earn Money</h2>
                <div className="center">[Use third party API to allow users to select the photo for their civilization]</div>
                <div className="center">[kingdom name and background image will be stored in a database]</div>
                <p id="soldiers">Soldiers: {numSoldiers}</p>
                <button className="column button" id="soldierButton" onClick={() => setNumSoldiers(numSoldiers+1)}>
                    Click to recruit soldiers
                    <img className="moneyButton" draggable="false" src="/coin.png"/>
                </button>
            </div>
        </>
    )
}