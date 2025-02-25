import { getLoggedIn, setLoggedIn } from "../storage/localStorage"

export async function loginUser(username, password){
    console.log(`Logging in: ${username}, ${password}`) // API call here
    
    if(!username){
        return false
    }
    setLoggedIn(true)
    const playerData = localStorage.getItem("playerData")
    if(playerData){
        return JSON.parse(playerData)
    } else {
        return {
            id: "",
            name: username,
            kingomName: "",
            unlockedGames: [],
            soldiers: 0
        }
    }
}

export async function logoutUser(){
    console.log("Logging out...") // API call here
    setLoggedIn(false)
    return true
}

export function ensureLoggedIn(){
    return getLoggedIn()
}