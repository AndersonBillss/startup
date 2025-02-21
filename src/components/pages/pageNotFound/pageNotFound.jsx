import React from "react"
import Navbar from "../../shared/nav/nav"
import '../../../styles.css'

export default function PageNotFound(){
    return(
        <>
            <div className="page">
                <div className="main underlined title">
                    <span className="primary-color">War</span>
                    <span className="secondary-color">Lab</span>
                </div>
                <h1>Page Not Found</h1>
            </div>
        </>
    )
}