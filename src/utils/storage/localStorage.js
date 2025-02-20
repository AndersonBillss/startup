const usernameKey = "username"
export function setUsername(username){
    return localStorage.setItem(usernameKey, username)
}
export function getUsername(){
    return localStorage.getItem(usernameKey)
}

const loggedInKey = "loggedIn"
export function setLoggedIn(loggedIn){
    localStorage.setItem(loggedInKey, JSON.stringify(loggedIn))
}
export function getLoggedIn(){
    return JSON.parse(localStorage.getItem(loggedInKey))
}