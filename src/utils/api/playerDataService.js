export async function updatePlayerData(playerData){
    console.log("Setting Player data:", playerData)
    localStorage.setItem("playerData", JSON.stringify(playerData))
    return playerData
}
export async function getPlayerData(){
    return JSON.parse(localStorage.getItem("playerData"))
}