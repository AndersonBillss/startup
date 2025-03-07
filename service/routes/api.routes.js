import { Router } from 'express';
import { validateUsername, validatePassword } from '../utils/signupVerification.js';
import { hashPassword, comparePassword } from '../utils/passwordAuth.js';
export const apiRoutes = Router();

export const users = [
    {
        id: "1934856",
        username: "BenjaminFranklin",
        hashedPassword: "$2b$10$ZFgPpm3Pg5NBWrMzJx.M7.ju/whI.0AWlDBOy61ZGuxUt1itJyg9W", // goodPassword1!
        kingdomName: "Green Hill Caliphate",
        kingdomImg: null,
        unlockedGames: [],
        soldiers: 25,
    },
    {
        id: "9864367",
        username: "ThomasJefferson",
        hashedPassword: "$2b$10$ZFgPpm3Pg5NBWrMzJx.M7.ju/whI.0AWlDBOy61ZGuxUt1itJyg9W", // goodPassword1!
        kingdomName: "Republic of Swift Computers",
        kingdomImg: null,
        unlockedGames: [],
        soldiers: 25,
    },
    {
        id: "5293693",
        username: "JuliusCaesar",
        hashedPassword: "$2b$10$ZFgPpm3Pg5NBWrMzJx.M7.ju/whI.0AWlDBOy61ZGuxUt1itJyg9W", // goodPassword1!
        kingdomName: "Duchy of Furious Composers",
        kingdomImg: null,
        unlockedGames: [],
        soldiers: 25,
    },
    {
        id: "0693485",
        username: "MikhialGorbachev",
        hashedPassword: "$2b$10$ZFgPpm3Pg5NBWrMzJx.M7.ju/whI.0AWlDBOy61ZGuxUt1itJyg9W", // goodPassword1
        kingdomName: "Humble Sword Dominion",
        kingdomImg: null,
        unlockedGames: [],
        soldiers: 25,
    },
]

apiRoutes.get("/ping", (req, res) => {
    res.send({msg: "Api routes working"})
})

apiRoutes.post("/signup", async(req, res) => {
    const username = req.body.username
    if(!username){
        res.status(400).send({msg: "No username provided"})
        return
    }
    if(findUser(username) !== false){
        res.status(400).send({msg: "Username already taken"})
        return
    }
    const validatedUsername = validateUsername(username)
    if(validatedUsername !== true){
        res.status(400).send({msg: validatedUsername})
        return
    }
    const password = req.body.password
    if(!password){
        res.status(400).send({msg: "No password provided"})
        return
    }
    const validatedPassword = validatePassword(password)
    if(validatedPassword !== true){
        res.status(400).send({msg: validatedPassword})
        return
    }
    const hashedPassword = await hashPassword(password)

    const kingdomName = req.body.kingdomName
    if(!kingdomName){
        res.status(400).send({msg: "No kingdomName provided"})
        return
    }
    const userSignupObject = {
        id: "",
        username: username,
        hashedPassword: hashedPassword,
        kingdomName: kingdomName,
        kingdomImg: null,
        unlockedGames: [],
        soldiers: 0
    }
    users.push(userSignupObject)
    res.send({msg: "success"})
})

apiRoutes.post("/login", async(req, res) => {
    const username = req.body.username
    const password = req.body.password
    if(!username){
        res.status(400).send({msg: "No username sent"})
        return
    }
    if(!password){
        res.status(401).send({msg: "No password sent"})
        return
    }
    console.log("username:", username)
    console.log("password:", password)
    const targetUser = findUser(username)
    if(targetUser === false){
        res.status(401).send({msg: "Invalid username or password"})
        return
    }
    console.log("username found:", targetUser)
    const correctPassword = await comparePassword(password, targetUser.hashedPassword)
    console.log("correct password:", correctPassword)
    if(!correctPassword){
        res.status(401).send({msg: "Invalid username or password"})
        return
    }
    res.send({data: limitUserData(targetUser)})
})
apiRoutes.put("/updateData", (req, res) => {

})

function findUser(username){
    for(const user of users){
        if(user.username === username){
            return user
        }
    }
    return false
}

function limitUserData(user){
    return{
        id: user.id,
        username: user.username,
        kingdomName: user.kingdomName,
        kingdomImg: user.kingdomImg,
        unlockedGames: user.unlockedGames,
        soldiers: user.soldiers
    }
}