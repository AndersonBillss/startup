import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayerData } from "../../../utils/context/PlayerContext";
import '../../../styles.css'
import "./login.css"
import { getLoggedIn } from "../../../utils/storage/localStorage";
import { ensureLoggedIn } from "../../../utils/api/auth";

export default function Login(){
    const { login } = usePlayerData()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [usernameErr, setUsernameErr] = useState(null)
    const [passwordErr, setPasswordErr] = useState(null)

    const [loginErr, setLoginErr] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if(ensureLoggedIn()){
            navigate("/home")
        }
    })

    function handleLoginClick(username, password){
        if(checkForInputError()){
            return
        }
        login(username, password).then(result => {
            if(result === true){
                navigate("/home")
            } else {
                setLoginErr(result)
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
        <form className="column-center"> 
            <label>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" autoComplete="username"/>
            {usernameErr && <div className="error">{usernameErr}</div>}
        
            <label>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" autoComplete="current-password"/>
            {passwordErr && <div className="error">{passwordErr}</div>}
        </form>
        <button className="button" onClick={() => {handleLoginClick(username, password)}}>Login</button>
        {loginErr && <div className="error">{loginErr}</div>}
        <div className="or-container">
            <div className="line" />
            <h2>OR</h2>
            <div className="line" />
        </div>
        <p>Don't have an account?</p>
        <button className="button" onClick={() => navigate("/signup")}>
            Sign Up
        </button>
    </div>
    )
}