import React, { useEffect, useState } from "react";
import '../../../styles.css'
import './attack.css'
import { usePlayerData } from "../../../utils/context/PlayerContext";
import Navbar from "../../shared/nav/nav"
import { connectUpdatePlayers, sendAttack } from "../../../utils/api/websocketService";

export default function Attack(){
    const { numSoldiers, setNumSoldiers, username, } = usePlayerData()
    const [players, setPlayers] = useState([])
    useEffect(() => {
        connectUpdatePlayers(setPlayers)
    },[])

    function attackPlayer(player){
        const attackAmount = Math.ceil(player.soldiers/2)
        if(numSoldiers - attackAmount < 0){
            return
        }
        setNumSoldiers(numSoldiers-attackAmount)
        sendAttack(player.username, attackAmount)
    }

    return(
        <>
            <Navbar></Navbar>
            <div className="page">
                <div className="main title">{username}</div>   
                <p>Current Soldiers: {numSoldiers}</p>         

                <h2 className="title center">Attack</h2>

                <h3 className="center">Choose who to attack</h3>
                {
                players?
                <div className="attack-table">
                    {
                    players.sort((a,b) => b.soldiers-a.soldiers).map((player, index) => {
                        return(
                            <div key={index} className="table-row">
                                <img className="kingdom-img" src={player.kingdomImg} />
                                <div className="table-section">
                                    <div className="player-top">
                                        <img className="small-kingdom-img" src={player.kingdomImg} />
                                        <h4 className="player-username">
                                            {player.username}
                                        </h4>
                                    </div>
                                    <p className="kingom-title">
                                        {player.kingdomName}
                                    </p>
                                    <div className="soldiers-display">
                                        Soldiers: {player.soldiers}
                                    </div>
                                </div>
                                <div>
                                    <img draggable="false" className="table-img button" src="sword.png" onClick={() => attackPlayer(player)}/>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                :
                <div>
                    Loading...
                </div>
                }
                
            </div>
        </>
    )
}