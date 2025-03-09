import React, { createContext, useContext, useEffect, useState } from 'react';
import { getPlayerData, updatePlayerData } from "../api/playerDataService"
import { setLoggedIn, loginUser, logoutUser, signupUser } from '../api/auth';
import { connectRecieveAttack, connectWebSocket } from '../api/websocketService';

const PlayerContext = createContext(null)

// Use React's Context API to allow sharing of state
export function PlayerStateProvider({ children }) {
  
    useEffect(() => {
      getPlayerData().then(([success, data]) => {
        if(success){
          setPlayerData(data)
          setLoggedIn(true)
        } else {
          setLoggedIn(false)
        }
      })
      connectWebSocket("MyUrl")
      connectRecieveAttack((numSoldiers) => {
        let newNumSoldiers = playerData.soldiers - numSoldiers
        if(newNumSoldiers < 0){
          newNumSoldiers = 0
        }
        setNumSoldiers(newNumSoldiers)
      })
    },[])

    const [playerData, setPlayerData] = useState({
      id: "",
      username: "",
      kingdomName: "",
      kingdomImg: null,
      unlockedGames: [],
      soldiers: 0
    })
    async function signup(username, password, kingdomName){
      try{
        const [success, msg] = await signupUser(username, password, kingdomName)
        if(success){
          return true
        } else {
          return msg
        }
      } catch (error){
        console.error(error)
        return "Error occurred while signing up";
      }
    }
    async function login(username, password){
      try{
        const [success, data] = await loginUser(username, password);
        if(success){
          setPlayerData(data);
        }
        return [success, data]
      } catch (error){
        return "Error occurred while logging in";
      }
    }
    async function logout(username, password){
      try{
        await logoutUser(username, password);
        return true;
      } catch (error){
        return false;
      }
    }
    async function unlockGame(game, price){
      if(playerData.soldiers - price < 0){
        return
      }
      playerData.unlockedGames.push(game)
      updatePlayerData(
        {
          ...playerData, 
          soldiers: (playerData.soldiers - price),
        }).then(([success, newData]) => {
        setPlayerData(newData)
      })
    }
    async function setKingdomImg(url){
      updatePlayerData(
        {
          ...playerData, 
          kingdomImg: url,
        }).then(([success, newData]) => {
        setPlayerData(newData)
      })
    }

    const setNumSoldiers = async(n) => {
      updatePlayerData({...playerData, soldiers: n}).then(([success, newData]) => {
        setPlayerData(newData)
      })
    }


    return (
      <PlayerContext.Provider value={{ 
        signup,
        login,
        logout,
        numSoldiers: playerData.soldiers, 
        setNumSoldiers, 
        username: playerData.username,
        unlockedGames: playerData.unlockedGames,
        kingdomName: playerData.kingdomName,
        kingdomImg: playerData.kingdomImg,
        setKingdomImg,
        unlockGame,
        playerData,
        }}>
        {children}
      </PlayerContext.Provider>
    );
}

// Custom hook for accessing soldiers
export function usePlayerData(){
    const context = useContext(PlayerContext);
    if (!context) throw new Error("usePlayerData must be used within a PlayerStateProvider");
    return context;
}