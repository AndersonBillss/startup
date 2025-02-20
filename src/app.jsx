import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles.css'

import Navbar from './nav/nav';
import Footer from './footer/footer';

import EarnMoney from './earnMoney/earnMoney';
import Attack from './attack/attack';
import About from './about/about';
import Login from './login/login';
import Home from './home/home';

import { SoldiersStateProvider } from './utils/context/SoldiersContext';

export default function app(){



    return(
        <SoldiersStateProvider>
            <BrowserRouter>
                <div className="container">
                    <Navbar></Navbar>
                    <Routes>
                        <Route path='/login' Component={Login}></Route>
                        <Route path='/home' Component={Home}></Route>
                        <Route path='/earnMoney' Component={EarnMoney}></Route>
                        <Route path='/about' Component={About}></Route>
                        <Route path='/attack' Component={Attack}></Route>
                    </Routes>
                    <Footer></Footer>
                </div>
            </BrowserRouter>
        </SoldiersStateProvider>
    )
}