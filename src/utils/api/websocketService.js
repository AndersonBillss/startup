// Implement websocket logic here
let connectedPlayers = null
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

let updatePlayersFunction = null
let updateSoldiersFunction = null
export const connectWebSocket = async() => { // Use a http request for now, but implement webSocket functionality when we get to that unit
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const url = `${protocol}://${window.location.hostname}:4000`
    const socket = new WebSocket(url);
    socket.onopen = (e) => {
        console.log("Connected to webSocket")
        socket.send("HELLO?")
    } 

    console.log("Connecting to websocket:", url)

    const response = await fetch(`/api/getUsers`, {
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
