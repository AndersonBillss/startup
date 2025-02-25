import React, { useState } from "react"
import { usePlayerData } from "../../../../utils/context/PlayerContext"

export default function Mining(){
    const [ currentHaul, setCurrentHaul ] = useState(0)
    const { numSoldiers, setNumSoldiers } = usePlayerData()

    function handleBankClick(){
        if(currentHaul !== 0){
            setNumSoldiers(numSoldiers + currentHaul)
            setCurrentHaul(0)
        }
    }

    function mine(){
        const random = Math.floor(Math.random()*7)
        if(random === 0){
            setCurrentHaul(0)
        } else {
            setCurrentHaul(currentHaul+1)
        }
    }

    return(
        <>
            <button className="column button" id="soldierButton" onClick={mine}>
                Click to earn money
                <img className="moneyButton" draggable="false" src="/coin.png"/>
            </button>
            <div>Current Haul: {currentHaul}</div>
            <button className="button" onClick={handleBankClick}>
                Bank
            </button>
        </>
    )
}