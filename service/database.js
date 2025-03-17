const { MongoClient } = require('mongodb')
const config = require('./dbConfig.json')

const flags = process.argv
const devEnvironment = flags.indexOf("--configuration=dev") !== -1;

const url = devEnvironment ? `mongodb://localhost:27017` : `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const database = client.db('webProgramming260Startup');
const userCollection = database.collection('user');


const users = [ // Mock data
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
async function addUser(user){
    users.push(user)
}
async function deleteCookie(username){
    const targetUser = await findUser(username);
    targetUser.token = null
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

// const db = {
//     addUser,
//     setUserData,
//     getUsers,
//     findAuthorized,
//     findUser,
//     limitGetUserData,
//     limitLoginUserData,
//     deleteCookie
// }//!

module.exports = {
    addUser,
    setUserData,
    getUsers,
    findAuthorized,
    findUser,
    limitGetUserData,
    limitLoginUserData,
    deleteCookie
}