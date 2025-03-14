import express from 'express';
import { Router } from 'express';
import cors from 'cors'
import cookieParser from "cookie-parser"
import { v4 as uuid }  from "uuid";
import bcrypt from 'bcrypt';
import db from './database.js';

// Default port
let port = 4000;
// The service port may be set on the command line
const flags = process.argv
flags.forEach(item => {
  if(item.slice(0,7) === "--port="){
    port = Number(item.slice(7,item.length))
  }
})

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true}))

app.use(express.static('public'));

export const apiRoutes = Router();
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

apiRoutes.get("/ping", (_req, res) => {
    res.send({msg: "Api routes working"})
})

apiRoutes.post("/signup", async(req, res) => {
    const username = req.body.username
    if(!username){
        res.status(400).send({msg: "No username provided"})
        return
    }
    if(await db.findUser(username) !== false){
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
        username: username,
        hashedPassword: hashedPassword,
        kingdomName: kingdomName,
        kingdomImg: null,
        unlockedGames: [],
        soldiers: 0
    }
    db.addUser(userSignupObject)
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
        res.status(400).send({msg: "No password sent"})
        return
    }
    const targetUser = await db.findUser(username)
    if(targetUser === false){
        res.status(400).send({msg: "Invalid username or password"})
        return
    }
    const correctPassword = await comparePassword(password, targetUser.hashedPassword)
    if(!correctPassword){
        res.status(400).send({msg: "Invalid username or password"})
        return
    }
    setAuthCookie(res, targetUser)
    res.send({data: db.limitLoginUserData(targetUser)})
})

apiRoutes.delete("/logout", verifyUser, async(req, res) => {
    clearAuthCookie(res, req.user)
    res.status(200).send({msg: "Succesfully logged out"})
})

apiRoutes.put("/data", verifyUser, async(req, res) => {
    if(!req.body.data){
        res.status(400).send({msg: "No data provided"})
        return
    }
    const updated = await db.setUserData(req.user.username, req.body.data)
    if(updated === false){
        res.status(400).send({msg: "Invalid user id provided"})
        return
    }
    res.send({data: db.limitLoginUserData(updated)})
})

apiRoutes.get("/data", verifyUser, async(req, res) => {
    res.send({data: db.limitLoginUserData(req.user)})
})

apiRoutes.get("/getUsers", verifyUser, async(req, res) => {
    const otherUsers = await db.getUsers([req.user])
    res.send({data: otherUsers})
})

apiRoutes.put("/attackUser", verifyUser, async(req, res) => {
    const target = req.body.target
    const soldiers = req.body.soldiers
    if(soldiers !== 0 && (!soldiers || soldiers < 0)){
        res.status(400).send({msg: "number of soldiers must be greater than 1"})
        return
    }
    if(!target){
        res.status(400).send({msg: "no target id specified"})
        return
    }
    const targetUser = await db.findUser(target)
    if(!targetUser){
        res.status(400).send({msg: "Target user doesn't exist"})
        return
    }
    targetUser.soldiers -= soldiers

    const otherUsers = await db.getUsers([req.user])
    res.send({data: otherUsers})
})

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});


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
    const targetUser = await db.findAuthorized(token)
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


export async function hashPassword(pw){
    const saltRounds = 10
    const hashedPw = await bcrypt.hash(pw, saltRounds)
    return hashedPw
}

export async function comparePassword(pw, hashedPw){
    const match = await bcrypt.compare(pw, hashedPw)
    return match
}

export function validateUsername(username) {
    const minLength = 3
    const maxLength = 20
    const regex = /^[a-zA-Z0-9_]+$/

    if (username.length < minLength || username.length > maxLength) {
        return "Username must be between 3 and 20 characters long."
    }
    if (!regex.test(username)) {
        return "Username can only contain letters, numbers, and underscores."
    }
    return true
}

export function validatePassword(password) {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    
    if (password.length < minLength) {
        return "Password must be at least 8 characters long."
    }
    if (!hasUpperCase) {
        return "Password must include at least one uppercase letter."
    }
    if (!hasLowerCase) {
        return "Password must include at least one lowercase letter."
    }
    if (!hasNumber) {
        return "Password must include at least one number."
    }
    if (!hasSpecialChar) {
        return "Password must include at least one special character."
    }
    return true
}