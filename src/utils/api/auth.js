import { setLoggedIn, setUsername } from "../storage/localStorage"

export async function login(username, password){
    console.log(`Logging in: ${username}, ${password}`) // API call here
    if(!username){
        return false
    }
    setUsername(username)
    setLoggedIn(true)
    return true
}

export async function logout(){
    console.log("Logging out") // API call here
    setUsername("")
    setLoggedIn(false)
    return true
}