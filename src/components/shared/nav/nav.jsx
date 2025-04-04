import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { usePlayerData } from "../../../utils/context/PlayerContext";
import '../../../styles.css'
import './nav.css'

export default function Navbar(){
    const { logout } = usePlayerData()
    const navigate = useNavigate()

    function handleLogoutClick(){
        logout().then(() => {
            navigate("/login") 
        })
    }

    return (
        <header>
            <nav className="nav">
                <div className="nav-top">
                    <NavLink className="title button" to="/home">
                        <span className="primary-color">War</span>
                        <span className="secondary-color">Lab</span>
                    </NavLink>
                </div>
                <div className="nav-bottom">
                    <NavLink className="button" to="/earnMoney">Earn Money</NavLink>
                    <NavLink className="button" to="/attack">Attack</NavLink>
                    <NavLink className="button" to="/about">About</NavLink>
                    <button onClick={handleLogoutClick} className="button">Log Out</button>
                </div>
            </nav>
        </header>
    )
}