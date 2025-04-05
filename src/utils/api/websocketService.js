// Implement websocket logic here
let connectedPlayers = null
let socket = null
let playername = ""
export async function sendAttack(playername, soldiers){
    const response = await fetch(`api/attackUser`, {
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

let updatePlayersFunction = processPlayerUpdate
let updateSoldiersFunction = null
export const connectWebSocket = async(username) => {
    playername = username
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const url = `${protocol}://${window.location.hostname}:4000`
    socket = new WebSocket(url);
    
    socket.onmessage = (e) => {
        const eventData = JSON.parse(e.data)
        if(eventData.command == "updatePlayers" && updatePlayersFunction) updatePlayersFunction(eventData.players)
    }
    
    const response = await fetch(`/api/getUsers`, {
        method: "GET",
        credentials: "include",
        headers: {'Content-Type': 'application/json'}
    })
    const responseJson = await response.json()

    connectedPlayers = responseJson.data
    if(updatePlayersFunction) updatePlayersFunction(connectedPlayers)
}
export function connectUpdatePlayers(fn){
    updatePlayersFunction = (players) => { fn(processPlayerUpdate(players)) }
    updatePlayersFunction(connectedPlayers)
}
export function connectRecieveAttack(fn){
    updateSoldiersFunction = fn
}

function processPlayerUpdate(players){
    if(!players) return
    const limitedPlayers = []
    players.forEach(player => {
        if(player.username == playername){
            updateSoldiersFunction(player)
        } else {
            limitedPlayers.push(player)
        }
    })
    return limitedPlayers;
}