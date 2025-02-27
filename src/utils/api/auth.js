const loggedInKey = "loggedIn"
function setLoggedIn(loggedIn){
    localStorage.setItem(loggedInKey, JSON.stringify(loggedIn))
}
function getLoggedIn(){
    const loggedIn = localStorage.getItem(loggedInKey)
    if(!loggedIn){
        return false
    }
    return JSON.parse(loggedIn)
}

export async function loginUser(username, password){
    console.log(`Logging in: ${username}, ${password}`) // API call here
    const playerData = localStorage.getItem("playerData")
    if(!playerData){
        throw new Error("You need to create an account before logging in")
    }
    const parsedData = JSON.parse(playerData)
    if(parsedData.name === username){
        setLoggedIn(true)
        return parsedData
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
        kingdomName: kingdomName,
        kingdomImg: null,
        unlockedGames: [],
        soldiers: 0
    }
    localStorage.setItem("playerData", JSON.stringify(signupUserObject))
    return signupUserObject
}

export function ensureLoggedIn(){
    if(!localStorage.getItem("playerData")){
        return false
    }
    return getLoggedIn()
}