import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSoldiers, setSoldiers } from '../api/soldiersService';

const SoldiersContext = createContext(null)

// Use React's Context API to allow sharing of state
export function SoldiersStateProvider({ children }) {  
    const [numSoldiers, setNumSoldiersState] = useState(null);

    // Use an API call to retrive soldiers
    useEffect(() => {
      getSoldiers().then(soldiers => {
        setNumSoldiersState(soldiers)
      })
    },[])

    // Wrap an API call around my setNumSoldiersState function 
    const setNumSoldiers = (n) => {
      setSoldiers(n).then(soldiers => {
        setNumSoldiersState(soldiers)
      })
    }

    return (
      <SoldiersContext.Provider value={{ numSoldiers, setNumSoldiers }}>
        {children}
      </SoldiersContext.Provider>
    );
}

// Custom hook for accessing soldiers
export function useSoldiers(){
    const context = useContext(SoldiersContext);
    if (!context) throw new Error("useSoldiers must be used within a SoldiersStateProvider");
    return context;
}