const { WebSocketServer } = require('ws');
let wsServer

function peerProxy(httpServer){
    wsServer = new WebSocketServer({ server: httpServer })
    console.log("Websocket Server running")

    wsServer.on("connection", (socket) => {
        socket.isAlive = true
    })
}

function updatePlayers(newPlayers){
    wsServer.clients.forEach((client) => {
        client.send(JSON.stringify({command: "updatePlayers", players: newPlayers}))
    })
}

module.exports = {peerProxy, updatePlayers}