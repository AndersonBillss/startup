import React, { createContext, useContext, useState } from 'react';
import { setSoldiers } from '../api/playerDataService';
import { loginUser } from '../api/auth';

const PlayerContext = createContext(null)



// Use React's Context API to allow sharing of state
export function PlayerStateProvider({ children }) {  
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
        await loginUser(username, password);
        return true;
      } catch (error){
        return false;
      }
    }

    // Wrap an API call around my setNumSoldiersState function 
    const setNumSoldiers = (n) => {
      setSoldiers(n).then(soldiers => {
        setPlayerData({...playerData, soldiers: soldiers})
      })
    }


    return (
      <PlayerContext.Provider value={{ 
        login,
        logout,
        numSoldiers: playerData.soldiers, 
        setNumSoldiers, 
        playerData, 
        setPlayerData
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