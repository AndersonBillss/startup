import React from "react";
import Navbar from "../../shared/nav/nav";
import { useNavigate, useParams } from "react-router-dom";
import Mining from "./games/Mining";
import { useSoldiers } from "../../../utils/context/SoldiersContext";

export default function Game(){
    const navigate = useNavigate();
    const { selctedGame } = useParams();
    const { numSoldiers } = useSoldiers()
    const gamesMap = {
        "mining": Mining
    }

    return(
        <>
            <Navbar></Navbar>
            <button className="button" onClick={() => navigate(-1)}>
                ← Back
            </button>
            <div className="page">
                <h2>Soldiers: {numSoldiers}</h2>
                {gamesMap[selctedGame]()}
            </div>
        </>
    )
}