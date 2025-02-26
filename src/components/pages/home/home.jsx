import React, { useEffect, useState } from "react"
import Navbar from "../../shared/nav/nav"
import { usePlayerData } from "../../../utils/context/PlayerContext"
import '../../../styles.css'
import './home.css'
import { toTitleCase } from "../../../utils/titlecase"
import { getImages } from "../../../utils/api/imageService"

export default function Home(){
    const {username, kingdomName, kingdomImg, setKingdomImg} = usePlayerData()
    const [imageUrls, setImageUrls] = useState([])
    useEffect(() => {
        getImages().then(images => {
            setImageUrls(images)
        })
    },[])
    return(
        <>
            <Navbar></Navbar>
            <div className="page">
                <div className="main underlined title">
                    <span className="primary-color">War</span>
                    <span className="secondary-color">Lab</span>
                </div>
                <div className="main title">Welcome, {username}</div>
                <div className="img-container">
                    <img className="selected-img" src={kingdomImg}>
                    </img>
                    <h2 className="selected-title">{toTitleCase(kingdomName)}</h2>
                </div>
                <div className="images">
                    {imageUrls.map((url, index) => {
                        return (
                        <img 
                        key={index} 
                        className="home-img button" 
                        src={url}
                        onClick={() => setKingdomImg(url)}
                        >
                        </img>
                    )
                    })}                
                </div>
            </div>
        </>
    )
}