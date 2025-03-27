import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './styles.css'

import Footer from './components/shared/footer/footer';
import EarnMoney from './components/pages/earnMoney/earnMoney';
import Attack from './components/pages/attack/attack';
import About from './components/pages/about/about';
import Login from './components/pages/login/login';
import Home from './components/pages/home/home';
import PageNotFound from './components/pages/pageNotFound/pageNotFound';
import Game from './components/pages/game/game';

import { PlayerStateProvider, usePlayerData } from './utils/context/PlayerContext';
import { setLoggedIn, ensureLoggedIn } from './utils/api/auth';
import { getPlayerData } from './utils/api/playerDataService';
import { connectRecieveAttack, connectWebSocket } from './utils/api/websocketService';
import Signup from './components/pages/signup/signup';

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const LoggedInPage = () => {
        return ensureLoggedIn() 
        ? 
        children
        : 
        <Navigate to="/login" replace />
    }
    
    return loading 
    ?
    <div className='page'>
        <UserDataFetch setLoading={setLoading} />
        <div>
            Loading...
        </div>
    </div>
    :
    <LoggedInPage />
};

const UserDataFetch = ({ setLoading }) => {
    const { setNumSoldiers, playerData, setPlayerDataState } = usePlayerData()
    
    useEffect(() => {
        getPlayerData().then(([success, data]) => {
            if(success){
                setPlayerDataState(data)
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
            setLoading(false)
        })
        connectWebSocket(playerData.username)
        connectRecieveAttack((newData) => {
            setPlayerDataState(newData)
        })
    },[])
}

export default function app(){
    return(
        <PlayerStateProvider>
            <BrowserRouter>
                <div className="container">
                    <Routes>
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/' element={<ProtectedRoute><Navigate to="/home" replace /></ProtectedRoute>} />
                        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                        <Route path='/earnMoney' element={<ProtectedRoute><EarnMoney /></ProtectedRoute>} />
                        <Route path='/about' element={<ProtectedRoute><About /></ProtectedRoute>} />
                        <Route path='/attack' element={<ProtectedRoute><Attack /></ProtectedRoute>} />
                        <Route path='/game/:selectedGame' element={<ProtectedRoute><Game /></ProtectedRoute>} />
                        <Route path='/*' element={<PageNotFound />} />
                    </Routes>
                    <Footer></Footer>
                </div>
            </BrowserRouter>
        </PlayerStateProvider>
    )
}
