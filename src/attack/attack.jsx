import React from "react";
import '../styles.css'
import './attack.css'
import { useSoldiers } from "../utils/context/SoldiersContext";
import { getUsername } from "../utils/storage/localStorage";

export default function Attack(){
    const { numSoldiers } = useSoldiers()
    return(
        <div className="page">
        <div className="main title">{getUsername()}</div>   
        <p>Current Soldiers: {numSoldiers}</p>         

        <h2 className="title center">Attack</h2>

        <h3 className="center">Choose who to attack</h3>
        <div className="center">[this data will updated when there are changes via websocket]</div>
        <div className="attack-table">
            <div className="table-row">
                <h4>
                    Benjamin Franklin
                </h4>
                <div>
                    Soldiers: 25
                </div>
                <div>
                    <img draggable="false" className="table-img button" src="sword.png"/>
                </div>
            </div>
            <div className="table-row">
                <h4>
                    Thomas Jefferson
                </h4>
                <div>
                    Soldiers: 25
                </div>
                <div>
                    <img draggable="false" className="table-img button" src="sword.png"/>
                </div>
            </div>
            <div className="table-row">
                <h4>
                    Julius Caesar
                </h4>
                <div>
                    Soldiers: 25
                </div>
                <div>
                    <img draggable="false" className="table-img button" src="sword.png"/>
                </div>
            </div>
            <div className="table-row">
                <h4>
                    Mikhial Gorbachev
                </h4>
                <div>
                    Soldiers: 25
                </div>
                <div>
                    <img draggable="false" className="table-img button" src="sword.png"/>
                </div>
            </div>
        </div>
    </div>
    )
}