import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './styles.css'

import Footer from './components/shared/footer/footer';
import EarnMoney from './components/pages/earnMoney/earnMoney';
import Attack from './components/pages/attack/attack';
import About from './components/pages/about/about';
import Login from './components/pages/login/login';
import Home from './components/pages/home/home';

import { SoldiersStateProvider } from './utils/context/SoldiersContext';
import { ensureLoggedIn } from './utils/api/auth';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    if(!ensureLoggedIn()){
        navigate("/login")
    }
    return children;
};

export default function app(){
    return(
        <SoldiersStateProvider>
            <BrowserRouter>
                <div className="container">
                    <Routes>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                        <Route path='/earnMoney' element={<ProtectedRoute><EarnMoney /></ProtectedRoute>} />
                        <Route path='/about' element={<ProtectedRoute><About /></ProtectedRoute>} />
                        <Route path='/attack' element={<ProtectedRoute><Attack /></ProtectedRoute>} />
                    </Routes>
                    <Footer></Footer>
                </div>
            </BrowserRouter>
        </SoldiersStateProvider>
    )
}