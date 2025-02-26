import { getLoggedIn, setLoggedIn } from "../storage/localStorage"

export async function loginUser(username, password){
    console.log(`Logging in: ${username}, ${password}`) // API call here
    const playerData = localStorage.getItem("playerData")
    if(!playerData){
        throw new Error("You need to create an account before logging in")
    }
    if(JSON.parse(playerData).name === username){
        setLoggedIn(true)
        return true
    }
    throw new Error("The created user doesn't have that username") 
}

export async function logoutUser(){
    console.log("Logging out...") // API call here
    setLoggedIn(false)
    return true
}

export async function signupUser(username, password, kingdomName){
    console.log("Signing up...") // API call here
    const signupUserObject = {
        id: "",
        name: username,
        kingomName: kingdomName,
        unlockedGames: [],
        soldiers: 0
    }
    localStorage.setItem("playerData", JSON.stringify(signupUserObject))
    return signupUserObject
}

export function ensureLoggedIn(){
    return getLoggedIn()
}