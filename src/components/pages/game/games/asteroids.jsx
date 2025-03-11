import "./asteroids.css"
import React, {useEffect} from "react";
import { usePlayerData } from "../../../../utils/context/PlayerContext"
import { useRef, useState } from "react"
import MobileGamepad from "../mobileGamepad";

export function Asteroids(){
    //Clear event listeners after exiting page
    useEffect(() => {      
        return () => {
          removeEventListeners();
        };
    }, []);
    const canvasRef = useRef(null)
    return(
        <div className="game">
            <Game canvasRef={canvasRef} />
            <Controls canvasRef={canvasRef}  />
        </div>
    )
}

function Game({ canvasRef }){
    return(
        <canvas className="asteroid-canvas" ref={canvasRef}></canvas>
    )
}

function Controls({ canvasRef }){
    const running = useRef(false)
    const [health, setHealth] = useState(null)
    const [score, setScore] = useState(null) 
    const {numSoldiers, setNumSoldiers} = usePlayerData()
    const gamepadControls = useRef(null)

    function addSoldiers(n){
        setNumSoldiers(numSoldiers + n)
    }

    function startGame(){
        if(!running.current){
            running.current = true
            gamepadControls.current = run(canvasRef.current, setHealth, setScore, addSoldiers, gamepadControls)
        }
    }
    if(health < 1 && health !== null){
        stopGame()
        running.current = false
    }
    return(
        <>
            {
                health < 1 && health !== null
                ?
                <>
                    <h1>You Lose!</h1>
                    <h1>Score: {score}</h1>
                </>
                :
                ''
            }
            {
            running.current
            ?
            <>
                <h1>Heath: {health}</h1>
                <h1>Score: {score}</h1>
            </>
            :
            <>
                <button className="button" onClick={startGame}>
                    Start asteroids
                </button>
            </>
            }
            <MobileGamepad 
            upArrowDown={gamepadControls.current ? gamepadControls.current.gamepadUp.down : () => {}}
            middleDown={gamepadControls.current ? gamepadControls.current.gamepadMiddle.down : () => {}}
            leftArrowDown={gamepadControls.current ? gamepadControls.current.gamepadLeft.down : () => {}}
            leftArrowUp={gamepadControls.current ? gamepadControls.current.gamepadLeft.up : () => {}}
            rightArrowDown={gamepadControls.current ? gamepadControls.current.gamepadRight.down : () => {}}
            rightArrowUp={gamepadControls.current ? gamepadControls.current.gamepadRight.up : () => {}}
            />
        </>
    )
}




let keys = {}; // Object to store key states

function handleKeyDown(event) {
    keys[event.code] = true;
}
function handleKeyUp(event) {
    keys[event.code] = false;
}
const windowKeydownEvent = (e) => {
    if(e.code === "Space" || e.code == "ArrowUp" || e.code === "KeyW"){
        e.preventDefault()
        shootMissile()
    }
    handleKeyDown(e)
}


let ctx
let canvas
let gravity = 1
let mainColor = "black"

let asteroidColor = "white"
let shipColor = "white"
let shipPosition

let shipSlowSpeed = 2
let shipFastSpeed = 6
let timeToSpeedUp = 200


let missileSpeed = 5
let asteroidRadius = 8
let timeBetweenAsteroids = 1200      

let scorePerHit = 3

let missiles = []
let asteroids = []

let updateHealthFunction
let updateScoreFunction
let addSoldiersFunction
let currentScore = 0
let currentHealth = 5
let gameStopped = true
function removeEventListeners(){
    window.removeEventListener("keydown", windowKeydownEvent);
    window.removeEventListener("keyup", handleKeyUp);
}

function run(canvasElement, updateHealth, updateScore, addSoldiers, gamepad){
    window.addEventListener("keydown", windowKeydownEvent);
    window.addEventListener("keyup", handleKeyUp);

    currentHealth = 5
    currentScore = 0
    updateScore(currentScore)
    updateHealthFunction = updateHealth
    updateScoreFunction = updateScore
    addSoldiersFunction = addSoldiers
    canvas = canvasElement
    ctx = canvas.getContext("2d");
    shipPosition = canvas.width/2
    keys = {}
    updateHealth(currentHealth)
    gameStopped = false
    gameLoop()
    const gamepadControls = {
        gamepadMiddle: {down: shootMissile},
        gamepadUp: {down: shootMissile},
        gamepadLeft: {up: () => {keys["ArrowLeft"] = false}, down: () => {keys["ArrowLeft"] = true}},
        gamepadRight: {up: () => {keys["ArrowRight"] = false}, down: () => {keys["ArrowRight"] = true}},
    }
    return gamepadControls
}

function stopGame(){
    if(gameStopped) return
    addSoldiersFunction(currentScore)
    removeEventListeners()
    gameStopped = true
    missiles = []
    asteroids = []
}

function gameLoop(){
    if(gameStopped){
        return
    }
    setTimeout(() => {
        gameUpdate()
        render()
        gameLoop()
    },(1000/60))
}

function shootMissile(){
    if(!canvas){
        return
    }
    // No more than 3 missiles at a time
    if(missiles.length < 3){
        missiles.push({
            top: (canvas.height-10),
            left: shipPosition
        })
    }
}
function summonAsteroid(left, health){
    lastAsteroidSpawn = Date.now()
    asteroids.push({
        left: left,
        top: 0,
        health: health
    })
}
let lastAsteroidSpawn = 0
function timeSinceLastAsteroidSpawn(){
    return Date.now()-lastAsteroidSpawn
}

function isColliding(asteroid, missile){
    const meteorToMissile = {
        x: asteroid.left - missile.left,
        y: asteroid.top - missile.top
    }
    // Use pythagorean theorum to determine distance
    const distanceToMissile = Math.sqrt(Math.pow(meteorToMissile.x,2) + Math.pow(meteorToMissile.y,2))
    const missileRadius = asteroid.health * asteroidRadius
    return distanceToMissile < missileRadius
}

function drawCircle(top, left, radius){
    ctx.beginPath();
    ctx.arc(left, top, radius, 0, Math.PI * 2);
    ctx.fillStyle = asteroidColor;
    ctx.fill();
}
function drawTriangle(top, left, base, height){
    ctx.beginPath();
    ctx.moveTo(left, top - height);
    ctx.lineTo(left + base / 2, top);
    ctx.lineTo(left - base / 2, top);
    ctx.closePath();
    ctx.fillStyle = shipColor;
    ctx.fill();
}

function clear(){
    ctx.fillStyle = mainColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

let lastMoveTime = Date.now()
function gameUpdate(){
    const currentTime = Date.now()
    let shipSpeed = shipSlowSpeed
    const timeSinceLastMove = currentTime - lastMoveTime
    if(timeSinceLastMove > timeToSpeedUp){
        shipSpeed = shipFastSpeed
    }
    if(keys["ArrowRight"] || keys["KeyD"]){
        shipPosition += shipSpeed
        // Snap Ship to edge of canvas if ship is too far
        if(shipPosition > canvas.width){
            shipPosition = canvas.width
        }
    }
    if(keys["ArrowLeft"] || keys["KeyA"]){
        shipPosition -= shipSpeed
        if(shipPosition < 0){
            shipPosition = 0
        }
    }
    if(!keys["ArrowLeft"] && !keys["ArrowRight"] && !keys["KeyD"] && !keys["KeyA"]){
        lastMoveTime = Date.now()
    }

    if(timeSinceLastAsteroidSpawn() > timeBetweenAsteroids){
        const randomPos = Math.random() * canvas.width
        const randomHealth = Math.floor((Math.random()*3)+1)
        summonAsteroid(randomPos, randomHealth)
    }
    asteroids.forEach((asteroid, index) => {
        asteroid.top += gravity
        if(asteroid.top > canvas.height){
            asteroids.splice(index,1)
            currentHealth -= asteroid.health
            updateHealthFunction(currentHealth)
        } else if(asteroid.health === 0){
            asteroids.splice(index,1)
        }
    })
    missiles.forEach((missile, index) => {
        missile.top -= missileSpeed
        if(missile.top < 0){
            missiles.splice(index,1)
        }
    })
    asteroids.forEach((asteroid) => {
        missiles.forEach((missile, missileIndex) => {
            if(isColliding(asteroid, missile)){
                missiles.splice(missileIndex,1)
                asteroid.health--
                currentScore += scorePerHit
                updateScoreFunction(currentScore)
            }
        })
    })
}
function render(){
    clear()
    asteroids.forEach((asteroid) => {
        const radius = asteroid.health * asteroidRadius
        drawCircle(asteroid.top, asteroid.left, radius)
    })
    missiles.forEach((missile) => {
        drawTriangle(missile.top, missile.left, 5, 10)
    })

    drawTriangle(canvas.height-5, shipPosition, 10, 20)
    drawTriangle(canvas.height-5, shipPosition, 20, 10)
}