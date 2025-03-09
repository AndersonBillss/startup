const apiUrl = "http://localhost:3000/api"
let loggedIn = false

export async function loginUser(username, password){
    const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })
    const responseJson = await response.json()
    if(response.ok){
        setLoggedIn(true)
        return [true, responseJson.data]
    } else {
        setLoggedIn(false)
        return [false, responseJson.msg]
    }
}

export async function logoutUser(){
    const response = await fetch(`${apiUrl}/logout`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    })
    setLoggedIn(false)
    const responseJson = await response.json()
    return [responseJson.ok, responseJson.msg]
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
    return loggedIn
}
export function setLoggedIn(loginSuccess){
    loggedIn = loginSuccess
}