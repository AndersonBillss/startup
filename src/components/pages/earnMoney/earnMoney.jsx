import React, { Fragment } from "react";
import '../../../styles.css'
import './earnMoney.css'
import { usePlayerData } from "../../../utils/context/PlayerContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../shared/nav/nav"

export default function EarnMoney(){
    const navigate = useNavigate()
    const games = [
        {
            title: "Mining",
            backgroundColor: "#FEE698",
            textColor: "black",
            costToUnlock: 0,
        },
        {
            title: "Snake",
            backgroundColor: "rgb(176, 234, 176)",
            textColor: "black",
            costToUnlock: 40,
        },
    ]
    const { numSoldiers, username, unlockGame, unlockedGames } = usePlayerData()
    function hasGame(game){
        return unlockedGames.indexOf(game) !== -1
    }
    
    return(
        <>
            <Navbar></Navbar>
            <div className="page">
                <div className="main title">Welcome, {username}!</div> 
                <h2 className="title center">Earn Money</h2>
                <div className="center">[Use third party API to allow users to select the photo for their civilization]</div>
                <div className="center">[kingdom name and background image will be stored in a database]</div>
                <p id="soldiers">Soldiers: {numSoldiers}</p>
                {
                    games.map((game, index) => {
                        return(
                            <Fragment key={index}>
                            {
                                hasGame(game.title)
                                ?
                                    <button
                                    onClick={() => navigate(`/game/${game.title.toLowerCase()}`)}
                                    className="game-select button"
                                    style={{backgroundColor: game.backgroundColor, color: game.textColor}}
                                    >
                                        <h4 className="game-title">{game.title}</h4>
                                    </button>
                                :
                                    <button
                                    onClick={() => unlockGame(game.title, game.costToUnlock)}
                                    className="game-select button locked"
                                    >
                                        <h4 className="game-title">{game.title}</h4>
                                        <p>Unlock: {game.costToUnlock} soldiers</p>
                                    </button>

                            }
                            </Fragment>
                        )
                    })
                }
            </div>
        </>
    )
}