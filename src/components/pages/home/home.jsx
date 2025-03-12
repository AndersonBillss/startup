import React, { useEffect, useState } from "react"
import Navbar from "../../shared/nav/nav"
import { usePlayerData } from "../../../utils/context/PlayerContext"
import '../../../styles.css'
import './home.css'
import { toTitleCase } from "../../../utils/titlecase"
import { getBuildingImages, getNatureImages, getAnimalImages } from "../../../utils/api/imageService"

export default function Home(){
    const {username, kingdomName, kingdomImg, setKingdomImg} = usePlayerData()
    const [buildingImageUrls, setBuildingImageUrls] = useState([])
    const [natureImgUrls, setNatureImgUrls] = useState([])
    const [animalImgUrls, setAnimalImgUrls] = useState([])
    const [selectedTab, setSelectedTab] = useState("buildings")
    const images = {
        "buildings": buildingImageUrls,
        "nature": natureImgUrls,
        "animals": animalImgUrls,
    }
    
    useEffect(() => {
        getBuildingImages().then(images => {
            setBuildingImageUrls(images)
        })
        getNatureImages().then(images => {
            setNatureImgUrls(images)
        })
        getAnimalImages().then(images => {
            setAnimalImgUrls(images)
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
                <p>Select a background image</p>
                <div className="img-tab-select">
                    <button className="button" onClick={() => setSelectedTab("buildings")}><div className="tab">Buildings</div></button>
                    <button className="button" onClick={() => setSelectedTab("nature")}><div className="tab">Nature</div></button>
                    <button className="button" onClick={() => setSelectedTab("animals")}><div className="tab">Animals</div></button>
                </div>
                <div className="images">
                    {images[selectedTab].map((url, index) => {
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