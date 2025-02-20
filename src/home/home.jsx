import React from "react"
import Navbar from "../nav/nav"

export default function Home(){
    return(
        <>
            <Navbar></Navbar>
            <div className="page">
                <div className="main underlined title">
                    <span className="primary-color">War</span>
                    <span className="secondary-color">Lab</span>
                </div>
            </div>
        </>
    )
}