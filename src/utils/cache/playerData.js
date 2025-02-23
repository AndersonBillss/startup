
let playerData = {
    id: "",
    name: "",
    kingomName: "",
    unlockedGames: [],
    soldiers: 0,
}

export function getPlayerData(){
    return playerData
}

export function setPlayerData(newData){
    playerData = newData
}