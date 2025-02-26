import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayerData } from "../../../utils/context/PlayerContext";
import '../../../styles.css'
import './signup.css'
import getRandomKingdomName from "../../../utils/getRandomKingdomName";
import { toTitleCase } from "../../../utils/titlecase";
import { validateUsername, validatePassword } from "../../../utils/signupVerification"

export default function Signup(){
    const navigate = useNavigate()
    const { signup } = usePlayerData()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [kingdomName, setKingdomName] = useState(getRandomKingdomName())

    const [usernameErr, setUsernameErr] = useState(null)
    const [passwordErr, setPasswordErr] = useState(null)
    const [confirmPasswordErr, setConfirmPasswordErr] = useState(null)

    function handleSignupClick(){
        const trimmedUsername = username.trim()
        const trimmedPassword = password.trim()
        const trimmedConfirmPassword = confirmPassword.trim()

        const usernameValid = validateUsername(trimmedUsername)
        if(usernameValid === true){ 
            setUsernameErr(null) 
        } else {
            setUsernameErr(usernameValid)
        }

        const passwordValid = validatePassword(trimmedPassword)
        if(passwordValid === true){ 
            setPasswordErr(null) 
        } else {
            setPasswordErr(passwordValid)
        }

        const confirmPasswordValid = trimmedPassword === trimmedConfirmPassword
        if(confirmPasswordValid){ 
            setConfirmPasswordErr(null);
        } else {
            setConfirmPasswordErr("Confirm Password doesn't match password")
        }
        
        if(!(usernameValid === true) || !(passwordValid === true) || !confirmPasswordValid){ 
            return 
        }

        signup(username, password, kingdomName).then(success => {
            if(success){
                navigate("/login")
            }
        })
    }

    return (
    <div className="page">
        <div className="main underlined title">
            <span className="primary-color">War</span>
            <span className="secondary-color">Lab</span>
        </div>
        <button className="button" onClick={() => navigate(-1)}>
            ← Back
        </button>
        <h2 className="title">Sign Up</h2>
        [These will be kept in a database]
        <form className="column-center"> 
            <label>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" autoComplete="username"/>
            {usernameErr && <div className="error">{usernameErr}</div>}
            <div className="note">Must be 3 - 20 characters</div>
        
            <label>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" autoComplete="current-password"/>
            {passwordErr && <div className="error">{passwordErr}</div>}
            <div className="note">Must be 8+ characters with an uppercase, lowercase, number, and special character</div>

            <label>Confirm Password</label>
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" type="password" autoComplete="new-password"/>
            {passwordErr && <div className="error">{confirmPasswordErr}</div>}

            <label>Kingdom Title</label>
        </form>
        <p className="kingdom-title">{toTitleCase(kingdomName)}</p>
        <button className="button" onClick={() => setKingdomName(getRandomKingdomName())}>
            <svg className="dice-icon" viewBox="0 -960 960 960" fill="#1f1f1f">
                <path d="M300-240q25 0 42.5-17.5T360-300q0-25-17.5-42.5T300-360q-25 0-42.5 17.5T240-300q0 25 17.5 42.5T300-240Zm0-360q25 0 42.5-17.5T360-660q0-25-17.5-42.5T300-720q-25 0-42.5 17.5T240-660q0 25 17.5 42.5T300-600Zm180 180q25 0 42.5-17.5T540-480q0-25-17.5-42.5T480-540q-25 0-42.5 17.5T420-480q0 25 17.5 42.5T480-420Zm180 180q25 0 42.5-17.5T720-300q0-25-17.5-42.5T660-360q-25 0-42.5 17.5T600-300q0 25 17.5 42.5T660-240Zm0-360q25 0 42.5-17.5T720-660q0-25-17.5-42.5T660-720q-25 0-42.5 17.5T600-660q0 25 17.5 42.5T660-600ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/>
            </svg>
        </button>
        <button className="button" onClick={handleSignupClick}><h2>Sign Up</h2></button>
    </div>
    )
}