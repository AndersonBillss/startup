
export async function updatePlayerData(playerData){
    const response = await fetch(`/api/data`, {
        method: "PUT",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: playerData })
    })
    const responseJson = await response.json()
    if(response.ok){
        return [true, responseJson.data]
    } else {
        return [false, responseJson.msg]
    }
}
export async function getPlayerData(){
    const response = await fetch(`/api/data`, {
        method: "GET",
        credentials: "include",
        headers: {'Content-Type': 'application/json'}
    })
    const responseJson = await response.json()
    if(response.ok){
        return [true, responseJson.data]
    } else {
        return [false, responseJson.msg]
    }
}