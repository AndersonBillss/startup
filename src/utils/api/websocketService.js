// Implement websocket logic here
let connectedPlayers = null
let url = ""
export async function sendAttack(playername, soldiers){
    // let targetPlayer
    // for(let i=0; i<connectedPlayers.length; i++){
    //     const player = connectedPlayers[i]
    //     if(id === player.id){
    //         targetPlayer = player
    //     }
    // }

    // targetPlayer.soldiers -= soldiers
    // if(targetPlayer.soldiers < 0){
    //     targetPlayer.soldiers = 0
    // }
    const response = await fetch(`${url}/attackUser`, {
        method: "PUT",
        credentials: "include",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            target: playername,
            soldiers: soldiers
        })
    })
    const responseJson = await response.json()

    connectedPlayers = responseJson.data
    updatePlayersFunction(connectedPlayers)
}

let updatePlayersFunction = null
let updateSoldiersFunction = null
export const connectWebSocket = async(apiUrl) => { // Use a http request for now, but implement webSocket functionality when we get to that unit
    url = apiUrl
    const response = await fetch(`${apiUrl}/getUsers`, {
        method: "GET",
        credentials: "include",
        headers: {'Content-Type': 'application/json'}
    })
    const responseJson = await response.json()

    connectedPlayers = responseJson.data
}
export function connectUpdatePlayers(fn){
    updatePlayersFunction = fn
    updatePlayersFunction(connectedPlayers)
}
export function connectRecieveAttack(fn){
    updateSoldiersFunction = fn
}
