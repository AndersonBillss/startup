const { WebSocketServer } = require('ws');
let wsServer

function peerProxy(httpServer){
    wsServer = new WebSocketServer({ server: httpServer })
    console.log("Websocket Server running")

    wsServer.on("connection", (socket) => {
        socket.isAlive = true

        // If the client is online, turn isAlive to true
        socket.on('message', (message) => {
            const data = JSON.parse(message.toString())
            if(data.message == "pong") socket.isAlive = true;
        });
    })

    // Use a ping pong method to determine whether a client is online
    // Send a ping message every 15 seconds
    setInterval(() => {
        wsServer.clients.forEach(function each(client) {
        if (client.isAlive === false) return client.terminate();

        client.isAlive = false;
        client.send(JSON.stringify({command: "ping"}));
        });
    }, 15000);
}

function updatePlayers(newPlayers){
    wsServer.clients.forEach((client) => {
        client.send(JSON.stringify({command: "updatePlayers", players: newPlayers}))
    })
}

module.exports = {peerProxy, updatePlayers}