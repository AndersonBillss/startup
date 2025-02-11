import React from "react";
import { NavLink } from "react-router-dom";
import '../styles.css'

export default function Navbar(){
    return (
        <header>
            <nav className="nav">
                <div className="nav-top">
                    <NavLink className="title button" href="/index.html">
                        <span className="primary-color">War</span>
                        <span className="secondary-color">Lab</span>
                    </NavLink>
                </div>
                <div className="nav-bottom">
                    <NavLink className="button" to="/">Login</NavLink>
                    <NavLink className="button" to="/earnMoney">Earn Money</NavLink>
                    <NavLink className="button" to="/attack">Attack</NavLink>
                    <NavLink className="button" to="/about">About</NavLink>
                </div>
            </nav>
        </header>
    )
}