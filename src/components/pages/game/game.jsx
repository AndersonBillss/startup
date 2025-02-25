import React from "react";
import Navbar from "../../shared/nav/nav";
import { useNavigate, useParams } from "react-router-dom";
import { usePlayerData } from "../../../utils/context/PlayerContext";
import Mining from "./games/mining";
import Snake from "./games/snake";

export default function Game(){
    const navigate = useNavigate();
    const { selectedGame } = useParams();
    const { numSoldiers } = usePlayerData()
    const gamesMap = {
        "mining": Mining,
        "snake": Snake
    }

    return(
        <>
            <Navbar></Navbar>
            <button className="button" onClick={() => navigate(-1)}>
                ← Back
            </button>
            <div className="page">
                <h2>Soldiers: {numSoldiers}</h2>
                {gamesMap[selectedGame]()}
            </div>
        </>
    )
}