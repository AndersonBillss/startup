import React from "react";
import '../../../styles.css'
import './earnMoney.css'
import { useSoldiers } from "../../../utils/context/SoldiersContext";
import { getUsername } from "../../../utils/storage/localStorage";
import { useNavigate } from "react-router-dom";
import Navbar from "../../shared/nav/nav"

export default function EarnMoney(){
    const navigate = useNavigate()
    const games = [
        {
            title: "Mining",
            backgroundColor: "#FEE698",
            textColor: "black",
            unlocked: true,
            costToUnlock: 0,
        }
    ]
    const { numSoldiers } = useSoldiers()
    return(
        <>
            <Navbar></Navbar>
            <div className="page">
                <div className="main title">Welcome, {getUsername()}!</div> 
                <h2 className="title center">Earn Money</h2>
                <div className="center">[Use third party API to allow users to select the photo for their civilization]</div>
                <div className="center">[kingdom name and background image will be stored in a database]</div>
                <p id="soldiers">Soldiers: {numSoldiers}</p>
                {
                    games.map((game, index) => {
                        return(
                            <button
                            key={index} 
                            onClick={() => navigate(`/game/${game.title.toLowerCase()}`)}
                            className="game-select button"
                            style={{backgroundColor: game.backgroundColor, color: game.textColor}}
                            >
                                {game.title}
                            </button>
                        )
                    })
                }
            </div>
        </>
    )
}