import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './styles.css'

import Footer from './footer/footer';
import EarnMoney from './earnMoney/earnMoney';
import Attack from './attack/attack';
import About from './about/about';
import Login from './login/login';
import Home from './home/home';

import { SoldiersStateProvider } from './utils/components/SoldiersContext';
import { ensureLoggedIn } from './utils/api/auth';

const ProtectedRoute = (component) => {
    return ensureLoggedIn() ? component : () => Navigate({to: "/login"});
};

export default function app(){
    return(
        <SoldiersStateProvider>
            <BrowserRouter>
                <div className="container">
                    <Routes>
                        <Route path='/login' Component={Login}></Route>
                        <Route path='/home' Component={ProtectedRoute(Home) } />
                        <Route path='/earnMoney' Component={ProtectedRoute(EarnMoney)} />
                        <Route path='/about' Component={ProtectedRoute(About)} />
                        <Route path='/attack' Component={ProtectedRoute(Attack)} />
                    </Routes>
                    <Footer></Footer>
                </div>
            </BrowserRouter>
        </SoldiersStateProvider>
    )
}