const loggedInKey = "loggedIn"
export function setLoggedIn(loggedIn){
    localStorage.setItem(loggedInKey, JSON.stringify(loggedIn))
}
export function getLoggedIn(){
    return JSON.parse(localStorage.getItem(loggedInKey))
}