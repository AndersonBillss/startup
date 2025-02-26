import { useEffect } from "react"

// Implement websocket logic here
let connectedPlayers = [
    {
        id: "1934856",
        name: "Benjamin Franklin",
        soldiers: 25,
        kingdomName: ""
    },
    {
        id: "9864367",
        name: "Thomas Jefferson",
        soldiers: 25,
        kingdomName: ""
    },
    {
        id: "5293693",
        name: "Julius Caesar",
        soldiers: 25,
        kingdomName: ""
    },
    {
        id: "0693485",
        name: "Mikhial Gorbachev",
        soldiers: 25,
        kingdomName: ""
    },
] 

export function sendAttack(id, soldiers){
    let targetPlayer
    for(let i=0; i<connectedPlayers.length; i++){
        const player = connectedPlayers[i]
        if(id === player.id){
            targetPlayer = player
        }
    }

    targetPlayer.soldiers -= soldiers
    if(targetPlayer.soldiers < 0){
        targetPlayer.soldiers = 0
    }
    updatePlayersFunction(connectedPlayers)
}

let updatePlayersFunction = null
let updateSoldiersFunction = null
export const connectWebSocket = (url) => {
    
}
export function connectUpdatePlayers(fn){
    updatePlayersFunction = fn
    updatePlayersFunction(connectedPlayers)
}
export function connectRecieveAttack(fn){
    updateSoldiersFunction = fn
}
