import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './styles.css'

import Footer from './components/shared/footer/footer';
import EarnMoney from './components/pages/earnMoney/earnMoney';
import Attack from './components/pages/attack/attack';
import About from './components/pages/about/about';
import Login from './components/pages/login/login';
import Home from './components/pages/home/home';
import PageNotFound from './components/pages/pageNotFound/pageNotFound';
import Game from './components/pages/game/game';

import { PlayerStateProvider } from './utils/context/PlayerContext';
import { ensureLoggedIn } from './utils/api/auth';

const ProtectedRoute = ({ children }) => ensureLoggedIn() ? children : <Navigate to="/login" replace />;

export default function app(){
    return(
        <PlayerStateProvider>
            <BrowserRouter>
                <div className="container">
                    <Routes>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/' element={<ProtectedRoute><Navigate to="/home" replace /></ProtectedRoute>}></Route>
                        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                        <Route path='/earnMoney' element={<ProtectedRoute><EarnMoney /></ProtectedRoute>} />
                        <Route path='/about' element={<ProtectedRoute><About /></ProtectedRoute>} />
                        <Route path='/attack' element={<ProtectedRoute><Attack /></ProtectedRoute>} />
                        <Route path='/game/:selctedGame' element={<ProtectedRoute><Game /></ProtectedRoute>} />
                        <Route path='/*' element={<PageNotFound />} />
                    </Routes>
                    <Footer></Footer>
                </div>
            </BrowserRouter>
        </PlayerStateProvider>
    )
}