const { WebSocketServer } = require('ws');

function peerProxy(httpServer){
    const wsServer = new WebSocketServer({ server: httpServer })
    console.log("Websocket Server running")

    wsServer.on("connection", (socket) => {
        socket.isAlive = true
        console.log("connected to webSocketServer")
        
        socket.on("message", data => {
            console.log(data)
        })
    })

}

module.exports = peerProxy