import { Router } from 'express';
import { validateUsername, validatePassword } from '../utils/signupVerification.js';
import { hashPassword, comparePassword } from '../utils/passwordAuth.js';
import { v4 as uuid }  from "uuid";
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
        token: null
    },
    {
        id: "9864367",
        username: "ThomasJefferson",
        hashedPassword: "$2b$10$ZFgPpm3Pg5NBWrMzJx.M7.ju/whI.0AWlDBOy61ZGuxUt1itJyg9W", // goodPassword1!
        kingdomName: "Republic of Swift Computers",
        kingdomImg: null,
        unlockedGames: [],
        soldiers: 25,
        token: null
    },
    {
        id: "5293693",
        username: "JuliusCaesar",
        hashedPassword: "$2b$10$ZFgPpm3Pg5NBWrMzJx.M7.ju/whI.0AWlDBOy61ZGuxUt1itJyg9W", // goodPassword1!
        kingdomName: "Duchy of Furious Composers",
        kingdomImg: null,
        unlockedGames: [],
        soldiers: 25,
        token: null
    },
    {
        id: "0693485",
        username: "MikhialGorbachev",
        hashedPassword: "$2b$10$ZFgPpm3Pg5NBWrMzJx.M7.ju/whI.0AWlDBOy61ZGuxUt1itJyg9W", // goodPassword1!
        kingdomName: "Humble Sword Dominion",
        kingdomImg: null,
        unlockedGames: [],
        soldiers: 25,
        token: null
    },
    {
        id: "5347546956782",
        username: "TestUser",
        hashedPassword: "$2b$10$ZFgPpm3Pg5NBWrMzJx.M7.ju/whI.0AWlDBOy61ZGuxUt1itJyg9W", // goodPassword1!
        kingdomName: "Humble Sword Dominion",
        kingdomImg: null,
        unlockedGames: [],
        soldiers: 25,
        token: null
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
    if(await findUser(username) !== false){
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
        id: uuid(),
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
    const targetUser = await findUser(username)
    if(targetUser === false){
        res.status(401).send({msg: "Invalid username or password"})
        return
    }
    const correctPassword = await comparePassword(password, targetUser.hashedPassword)
    if(!correctPassword){
        res.status(401).send({msg: "Invalid username or password"})
        return
    }
    setAuthCookie(res, targetUser)
    res.send({data: limitLoginUserData(targetUser)})
})

apiRoutes.delete("/logout", verifyUser, async(req, res) => {
    clearAuthCookie(res, req.user)
    res.status(200).send({msg: "Succesfully logged out"})
})

apiRoutes.put("/data", verifyUser, async(req, res) => {
    if(!req.body.data){
        res.status(401).send({msg: "No data provided"})
        return
    }
    const updated = await setUserData(req.user.id, req.body.data)
    if(updated === false){
        res.status(401).send({msg: "Invalid user id provided"})
        return
    }
    res.send({data: limitLoginUserData(updated)})
})

apiRoutes.get("/data", verifyUser, async(req, res) => {
    res.send({data: limitLoginUserData(req.user)})
})

async function setUserData(userId, data){
    for(const user of users){
        if(user.id === userId){
            for(const key of Object.keys(data)){
                user[key] = data[key]
            }
            return user
        }
    }
    return false
}

async function findUser(username){
    for(const user of users){
        if(user.username === username){
            return user
        }
    }
    return false
}
async function findAuthorized(token){
    for(const user of users){
        if(user.token === token){
            return user
        }
    }
    return false
}

function limitLoginUserData(user){
    return{
        id: user.id,
        username: user.username,
        kingdomName: user.kingdomName,
        kingdomImg: user.kingdomImg,
        unlockedGames: user.unlockedGames,
        soldiers: user.soldiers,
        token: user.token
    }
}
function limitGetUserData(user){
    return{
        id: user.id,
        username: user.username,
        kingdomName: user.kingdomName,
        kingdomImg: user.kingdomImg,
        soldiers: user.soldiers
    }
}

function setAuthCookie(res, user) {
    user.token = uuid();
  
    res.cookie('token', user.token, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

// Middleware function
async function verifyUser(req, res, next){
    const token = req.cookies["token"]
    const targetUser = await findAuthorized(token)
    if(!targetUser){
        res.status(401).send({ msg: 'Unauthorized' });
        return
    }
    req.user = targetUser
    next()
}

function clearAuthCookie(res, user) {
    delete user.token;
    res.clearCookie('token');
}