import { Router } from 'express';
import { validateUsername, validatePassword } from '../utils/signupVerification.js';
import { hashPassword, comparePassword } from '../utils/passwordAuth.js';
export const apiRoutes = Router();

export const users = [
    {
        id: "1934856",
        username: "BenjaminFranklin",
        hashedPassword: "$2b$10$ZFgPpm3Pg5NBWrMzJx.M7.ju/whI.0AWlDBOy61ZGuxUt1itJyg9W", // goodPassword1
        kingdomName: "Green Hill Caliphate",
        kingdomImg: null,
        unlockedGames: [],
        soldiers: 25,
    },
    {
        id: "9864367",
        username: "ThomasJefferson",
        hashedPassword: "$2b$10$ZFgPpm3Pg5NBWrMzJx.M7.ju/whI.0AWlDBOy61ZGuxUt1itJyg9W", // goodPassword1
        kingdomName: "Republic of Swift Computers",
        kingdomImg: null,
        unlockedGames: [],
        soldiers: 25,
    },
    {
        id: "5293693",
        username: "JuliusCaesar",
        hashedPassword: "$2b$10$ZFgPpm3Pg5NBWrMzJx.M7.ju/whI.0AWlDBOy61ZGuxUt1itJyg9W", // goodPassword1
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
    for(const user of users){
        if(user.username === username){
            res.status(400).send({msg: "Username already taken"})
            return
        }
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

apiRoutes.post("/login", (req, res) => {

})
apiRoutes.put("/updateData", (req, res) => {

})