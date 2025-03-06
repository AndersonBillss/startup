import { Router } from 'express';
export const apiRoutes = Router();

export const users = [
    {
        id: "1934856",
        name: "Benjamin Franklin",
        kingdomName: "Green Hill Caliphate",
        kingdomImg: null,
        unlockedGames: [],
        soldiers: 25,
    },
    {
        id: "9864367",
        name: "Thomas Jefferson",
        kingdomName: "Republic of Swift Computers",
        kingdomImg: null,
        unlockedGames: [],
        soldiers: 25,
    },
    {
        id: "5293693",
        name: "Julius Caesar",
        kingdomName: "Duchy of Furious Composers",
        kingdomImg: null,
        unlockedGames: [],
        soldiers: 25,
    },
    {
        id: "0693485",
        name: "Mikhial Gorbachev",
        kingdomName: "Humble Sword Dominion",
        kingdomImg: null,
        unlockedGames: [],
        soldiers: 25,
    },
]

apiRoutes.get("/ping", (req, res) => {
    res.send({msg: "Api routes working"})
})

apiRoutes.post("/signup", (req, res) => {
    
})
apiRoutes.post("/login", (req, res) => {

})
apiRoutes.put("/updateData", (req, res) => {

})