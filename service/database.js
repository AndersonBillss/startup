const { MongoClient } = require('mongodb')
const config = require('./dbConfig.json')

const flags = process.argv
const devEnvironment = flags.indexOf("--configuration=dev") !== -1;

const url = devEnvironment ? `mongodb://localhost:27017` : `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const database = client.db('webProgramming260Startup');
const userCollection = database.collection('user');

async function addUser(user){    
    try {
        await userCollection.insertOne(user);
    } catch (error) {
        throw error;
    }
}
async function setUserData(username, data){
    const user = {
        ...data,
        username: username
    }
    try{
        return await userCollection.updateOne({ username: user.username }, { $set: user });
    } catch(error){
        throw error
    }
}

async function findUser(username){
    try{
        return userCollection.findOne({ username });
    } catch(error){
        throw error
    }
}
async function getUsers(excludedUsers){
    const users = await userCollection.find({}).toArray()
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
async function findAuthorized(token){
    if(!token) return null
    try{
        return userCollection.findOne({ token });
    } catch(error){
        throw error
    }
}

async function setToken(username, token){
    try{
        return await userCollection.updateOne({ username: username }, { $set: { token: token } });
    } catch(error){
        throw error
    }
}
async function deleteToken(username){
    setToken(username, null)
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

module.exports = {
    addUser,
    setUserData,
    getUsers,
    findAuthorized,
    findUser,
    limitGetUserData,
    limitLoginUserData,
    setToken,
    deleteToken
}