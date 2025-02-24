import React from "react";
import '../../../styles.css'
import './attack.css'
import { usePlayerData } from "../../../utils/context/PlayerContext";
import Navbar from "../../shared/nav/nav"

export default function Attack(){
    const { numSoldiers, username } = usePlayerData()
    return(
        <>
            <Navbar></Navbar>
            <div className="page">
            <div className="main title">{username}</div>   
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
        </>
    )
}