import React, { createContext, useContext, useState } from 'react';

const SoldiersContext = createContext(null)

// Use React's Context API to allow sharing of state
export function SoldiersStateProvider({ children }) {
    const [numSoldiers, setNumSoldiers] = useState(null);
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