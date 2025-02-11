import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import '../styles.css'

export default function Login(){
    return (
    <div className="page">
        <div className="main underlined title">
            <span className="primary-color">War</span>
            <span className="secondary-color">Lab</span>
        </div>
        <h2 className="title">Login</h2>
        [These will be kept in a database]
    
        <label>Username</label>
        <input placeholder="Username"/>
    
        <label>Password</label>
        <input placeholder="Password" type="password"/>

        <NavLink className="button" to={'/earnMoney'}>Login</NavLink>
    </div>
    )
}