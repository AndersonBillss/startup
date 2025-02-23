import { setPlayerData } from "../cache/playerData"
import { getLoggedIn, setLoggedIn, setUsername } from "../storage/localStorage"

export async function login(username, password){
    console.log(`Logging in: ${username}, ${password}`) // API call here
    if(!username){
        return false
    }
    setPlayerData({
        id: 12489876957,
        name: username,
        kingomName: "",
        unlockedGames: [],
        soldiers: 0
    })
    
    setUsername(username)
    setLoggedIn(true)
    return true
}

export async function logout(){
    console.log("Logging out...") // API call here
    setUsername("")
    setLoggedIn(false)
    return true
}

export function ensureLoggedIn(){
    return getLoggedIn()
}