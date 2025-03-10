import { Router } from 'express';
import { validateUsername, validatePassword } from '../utils/signupVerification.js';
import { hashPassword, comparePassword } from '../utils/passwordAuth.js';
import { v4 as uuid }  from "uuid";
export const apiRoutes = Router();

export const users = [ // Mock data
    {
        username: "BenjaminFranklin",
        hashedPassword: "$2b$10$ZFgPpm3Pg5NBWrMzJx.M7.ju/whI.0AWlDBOy61ZGuxUt1itJyg9W", // goodPassword1!
        kingdomName: "Green Hill Caliphate",
        kingdomImg: "https://th.bing.com/th/id/R.ff47da8ee8118d9dc4d394919c9d5fe5?rik=E38d%2bCaqdJ859g&riu=http%3a%2f%2fwww.nationalpedia.com%2fwp-content%2fuploads%2f2017%2f05%2fNational-Flag-of-the-United-States.jpg&ehk=t09O8Cipuyhrsr5CJmbZRUEemqMjuwY%2fVpsZ20N1eGM%3d&risl=&pid=ImgRaw&r=0",
        unlockedGames: [],
        soldiers: 999,
        token: null
    },
    {
        username: "ThomasJefferson",
        hashedPassword: "$2b$10$ZFgPpm3Pg5NBWrMzJx.M7.ju/whI.0AWlDBOy61ZGuxUt1itJyg9W", // goodPassword1!
        kingdomName: "Republic of Swift Computers",
        kingdomImg: "https://fthmb.tqn.com/Q5HpXsZd1Adb9qQ0P0URZbajASA=/3865x2576/filters:fill(auto,1)/us-constitution-175495818-584222b55f9b5851e5878357.jpg",
        unlockedGames: [],
        soldiers: 45,
        token: null
    },
    {
        username: "JuliusCaesar",
        hashedPassword: "$2b$10$ZFgPpm3Pg5NBWrMzJx.M7.ju/whI.0AWlDBOy61ZGuxUt1itJyg9W", // goodPassword1!
        kingdomName: "Duchy of Furious Composers",
        kingdomImg: "https://th.bing.com/th/id/OIP.0FjbbDw0u9lQJVhT8Zkv3gHaEU?rs=1&pid=ImgDetMain",
        unlockedGames: [],
        soldiers: 13,
        token: null
    },
    {
        username: "MikhialGorbachev",
        hashedPassword: "$2b$10$ZFgPpm3Pg5NBWrMzJx.M7.ju/whI.0AWlDBOy61ZGuxUt1itJyg9W", // goodPassword1!
        kingdomName: "Humble Sword Dominion",
        kingdomImg: "https://th.bing.com/th/id/OIP.LKv90-dWJkU7TT-lQDPHDAHaEo?rs=1&pid=ImgDetMain",
        unlockedGames: [],
        soldiers: 250,
        token: null
    },
    {
        username: "GenghisKhan",
        hashedPassword: "$2b$10$ZFgPpm3Pg5NBWrMzJx.M7.ju/whI.0AWlDBOy61ZGuxUt1itJyg9W", // goodPassword1!
        kingdomName: "Empire of Good Greatness",
        kingdomImg: "https://th.bing.com/th/id/R.202bae0e3abc85e993c887332ee7b74f?rik=vTneIZz2RmdjcQ&riu=http%3a%2f%2f3.bp.blogspot.com%2f-_gHEUPycLqk%2fUvn4W0hWR8I%2fAAAAAAAACCI%2fGs8Bb2w1N1A%2fs1600%2fGer%2b-%2bJH%2b(2).jpg&ehk=UTSBdtnCt70mDctsVIFYi99FN9cvjubZJvoDACVi9ck%3d&risl=&pid=ImgRaw&r=0",
        unlockedGames: [],
        soldiers: 10000,
        token: null
    },
    {
        username: "NicholasII",
        hashedPassword: "$2b$10$ZFgPpm3Pg5NBWrMzJx.M7.ju/whI.0AWlDBOy61ZGuxUt1itJyg9W", // goodPassword1!
        kingdomName: "Tsardom of Humble Fields",
        kingdomImg: "https://www.publicdomainpictures.net/pictures/70000/velka/winter-palace-in-st-petersburg.jpg",
        unlockedGames: [],
        soldiers: 3,
        token: null
    },
    {
        username: "TestUser",
        hashedPassword: "$2b$10$nkNUE4YoR/Lg9F/TIUxCueolFDiMbFdh5EuKhjGArnGOHHaS2KL1m", // Aa!11111
        kingdomName: "Confederation of Calm Composers",
        kingdomImg: null,
        unlockedGames: [],
        soldiers: 0,
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
        res.status(400).send({msg: "No password sent"})
        return
    }
    const targetUser = await findUser(username)
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
    res.send({data: limitLoginUserData(targetUser)})
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
    const updated = await setUserData(req.user.username, req.body.data)
    if(updated === false){
        res.status(400).send({msg: "Invalid user id provided"})
        return
    }
    res.send({data: limitLoginUserData(updated)})
})

apiRoutes.get("/data", verifyUser, async(req, res) => {
    res.send({data: limitLoginUserData(req.user)})
})

apiRoutes.get("/getUsers", verifyUser, async(req, res) => {
    const otherUsers = await getUsers([req.user])
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
    const targetUser = await findUser(target)
    if(!targetUser){
        res.status(400).send({msg: "Target user doesn't exist"})
        return
    }
    targetUser.soldiers -= soldiers

    const otherUsers = await getUsers([req.user])
    res.send({data: otherUsers})
})

async function setUserData(username, data){
    for(const user of users){
        if(user.username === username){
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
async function getUsers(excludedUsers){
    function userIncluded(targetUser, excludedUsers){
        for(const user of excludedUsers){
            if(user.username === targetUser.username){
                return true
            }
        }
        return false
    }
    const resultUsers = []
    for(const user of users){
        if(!userIncluded(user, excludedUsers)){
            resultUsers.push(limitGetUserData(user))
        }
    }
    return resultUsers
}

function limitLoginUserData(user){
    return{
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