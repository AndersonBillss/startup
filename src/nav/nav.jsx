import React from "react";
import '../styles.css'

export default function Navbar(){
    return (
        <header>
            <nav className="nav">
                <div className="nav-top">
                    <a className="title button" href="/index.html">
                        <span className="primary-color">War</span>
                        <span className="secondary-color">Lab</span>
                    </a>
                </div>
                <div className="nav-bottom">
                    <a className="button" href="/index.html">Login</a>
                    <a className="button"  href="/earnMoney.html">Earn Money</a>
                    <a className="button"  href="/attack.html">Attack</a>
                    <a className="button"  href="/about.html">About</a>
                </div>
            </nav>
        </header>
    )
}