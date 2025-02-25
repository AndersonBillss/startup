import { getLoggedIn, setLoggedIn, setUsername } from "../storage/localStorage"

export async function loginUser(username, password){
    console.log(`Logging in: ${username}, ${password}`) // API call here
    if(!username){
        return false
    }
    setLoggedIn(true)
    return {
        id: 12489876957,
        name: username,
        kingomName: "",
        unlockedGames: [],
        soldiers: 5
    }
    
}

export async function logoutUser(){
    console.log("Logging out...") // API call here
    setUsername("")
    setLoggedIn(false)
    return true
}

export function ensureLoggedIn(){
    return getLoggedIn()
}