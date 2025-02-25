import React, { createContext, useContext, useEffect, useState } from 'react';
import { getPlayerData, updatePlayerData } from "../api/playerDataService"
import { loginUser, logoutUser } from '../api/auth';
import { getLoggedIn } from '../storage/localStorage';

const PlayerContext = createContext(null)



// Use React's Context API to allow sharing of state
export function PlayerStateProvider({ children }) {
    useEffect(() => {
      if(getLoggedIn()){
        console.log("Already logged in. Getting player data...")
        getPlayerData().then(data => {
          setPlayerData(data)
          console.log(data)
        })
      }
    },[])

    const [playerData, setPlayerData] = useState({
      id: "",
      name: "",
      kingomName: "",
      unlockedGames: [],
      soldiers: 0
    })

    async function login(username, password){
      try{
        const data = await loginUser(username, password); 
        setPlayerData(data);
        return true;
      } catch (error){
        return false;
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
        }).then(newData => {
        setPlayerData(newData)
      })
    }

    // Wrap an API call around my setNumSoldiersState function 
    const setNumSoldiers = (n) => {
      updatePlayerData({...playerData, soldiers: n}).then(newData => {
        setPlayerData(newData)
      })
    }


    return (
      <PlayerContext.Provider value={{ 
        login,
        logout,
        numSoldiers: playerData.soldiers, 
        setNumSoldiers, 
        username: playerData.name,
        unlockedGames: playerData.unlockedGames,
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