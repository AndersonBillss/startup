const loggedInKey = "loggedIn"
const apiUrl = "http://localhost:3000/api"

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
    const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })
    const responseJson = await response.json()
    if(response.ok){
        return [true, responseJson.data]
    } else {
        return [false, responseJson.msg]
    }
}

export async function logoutUser(){
    console.log("Logging out...") // API call here
    setLoggedIn(false)
    return true
}

export async function signupUser(username, password, kingdomName){
    const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: username,
            password: password,
            kingdomName: kingdomName
        })
    })
    if(response.ok){
        return [true, "Successfully logged in"]
    } else {
        const responseJson = await response.json()
        return [false, responseJson.msg]
    }
}

export function ensureLoggedIn(){
    if(!localStorage.getItem("playerData")){
        return false
    }
    return getLoggedIn()
}