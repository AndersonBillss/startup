import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api/auth";
import '../styles.css'

export default function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [usernameErr, setUsernameErr] = useState(null)
    const [passwordErr, setPasswordErr] = useState(null)

    const navigate = useNavigate()

    function handleLoginClick(username, password){
        if(checkForInputError()){
            return
        }
        login(username, password).then(success => {
            if(success){
                navigate("/earnMoney")
            }
        })
    }

    function checkForInputError(){
        let error = false

        if(username == ""){
            setUsernameErr("You need to include a username")
            error = true
        } else {
            setUsernameErr(null)
        }

        if(password == ""){
            setPasswordErr("You need to include a password")
            error = true
        } else {
            setPasswordErr(null)
        }

        return error
    }

    return (
    <div className="page">
        <div className="main underlined title">
            <span className="primary-color">War</span>
            <span className="secondary-color">Lab</span>
        </div>
        <h2 className="title">Login</h2>
        [These will be kept in a database]
    
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
        {usernameErr && <div className="error">{usernameErr}</div>}
    
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password"/>
        {passwordErr && <div className="error">{passwordErr}</div>}

        <button className="button" onClick={() => {handleLoginClick(username, password)}}>Login</button>
    </div>
    )
}