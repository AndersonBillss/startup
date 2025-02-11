import React from "react";
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

        <a className="button" href="/earnMoney.html">Login</a>
    </div>
    )
}