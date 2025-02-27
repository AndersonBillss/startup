import React, { useEffect, useRef, useState } from "react";
import { usePlayerData } from "../../../../utils/context/PlayerContext"
import "./snake.css"

export default function Snake(){
    const { numSoldiers, setNumSoldiers } = usePlayerData()
    const gridWidth = 10
    const gridHeight = 10
    const startingSnake = [
        [4,2], 
        [4,1],
    ]
    const startingApple = [4,8]

    const [snake, setSnake] = useState(startingSnake)
    const [apple, setApple] = useState(startingApple)
    const applePosRef = useRef(startingApple)
    const [lose, setLose] = useState(false)
    const playingRef = useRef(false)
    const intervalRef = useRef(null);
    const growRef = useRef(false);
    const prevDirectionRef = useRef("right");
    const directionRef = useRef("right");
    const pointsRef = useRef(0)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight") directionRef.current = "right";
            if (e.key === "ArrowLeft") directionRef.current = "left";
            if (e.key === "ArrowUp") directionRef.current = "up";
            if (e.key === "ArrowDown") directionRef.current = "down";
            if (e.key === "d") directionRef.current = "right";
            if (e.key === "a") directionRef.current = "left";
            if (e.key === "w") directionRef.current = "up";
            if (e.key === "s") directionRef.current = "down";
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    function startGame() {
        setSnake(startingSnake)
        setApple(startingApple)
        applePosRef.current = startingApple
        setLose(false)
        pointsRef.current = 0
        directionRef.current = "right"
        prevDirectionRef.current = "right"
        playingRef.current = true
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setSnake((prevSnake) => moveSnake(prevSnake));
        }, 350);
    }
    if (!playingRef.current) clearInterval(intervalRef.current);

    function moveSnake(prevSnake){
        const newSnake = [...prevSnake]
        const head = newSnake[0]
        const opposites = {
            "right": "left",
            "left": "right",
            "up": "down",
            "down": "up",
        }
        if(opposites[prevDirectionRef.current] === directionRef.current){
            //Don't allow people to go straight backwards
            directionRef.current = prevDirectionRef.current
        }
        prevDirectionRef.current = directionRef.current
        let newHead;
        if(directionRef.current === "right") newHead = [head[0], head[1] + 1]
        if(directionRef.current === "left") newHead = [head[0], head[1] - 1]
        if(directionRef.current === "up") newHead = [head[0] - 1, head[1]]
        if(directionRef.current === "down") newHead = [head[0] + 1, head[1]]
        newSnake.unshift(newHead)

        if (!growRef.current) newSnake.pop()
        growRef.current = false
        if(isTouchingApple(newSnake, applePosRef.current)){
            pointsRef.current ++
            growRef.current = true
            applePosRef.current = randomizeApple(prevSnake);;
        }
        if(isColliding(newSnake)){
            loseGame()
        }
        return newSnake
    }

    function isTouchingApple(snake, applePosition){
        const head = snake[0]
        return head[0] === applePosition[0] && head[1] === applePosition[1]
    }
    function isColliding(snake){
        const head = snake[0]
        const outOfBoundsTop = head[0] < 0
        const outOfBoundsBottom = head[0] >= gridHeight
        const outOfBoundsLeft = head[1] < 0
        const outOfBoundsRight = head[1] >= gridWidth
        const outOfBounds = outOfBoundsTop || outOfBoundsBottom || outOfBoundsLeft || outOfBoundsRight
        if(outOfBounds) return true
        for(let i = 1; i < snake.length; i++){
            const item = snake[i]
            if(item[0] === head[0] && item[1] === head[1]){
                return true
            }
        }
        return false
    }
    function randomizeApple(currSnake){
        const emptyCells = [];
        for (let row = 0; row < gridHeight; row++) {
            for (let col = 0; col < gridWidth; col++) {
                const isOccupied = currSnake.some(([sRow, sCol]) => sRow === row && sCol === col);
                if (!isOccupied) {
                    emptyCells.push([row, col]);
                }
            }
        }
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const newApple = emptyCells[randomIndex];
            setApple(newApple);        
            return newApple    
        }        

    }
    function loseGame(){
        setLose(true)
        setNumSoldiers(numSoldiers + getTotalPoints())
    }
    function getTotalPoints(){
        let totalPoints = 0
        for (let i = 0; i < pointsRef.current; i++){
            //Earn more points the longer you stay alive
            totalPoints += Math.floor(i/3)+3
        }
        return totalPoints
    }

    if(lose === true){
        playingRef.current = false
    }
    const Cell = ({row, col}) => {
        const cellType = getCellType(row, col)
        return( 
            <div className="cell">
                <div className="item-container">
                    {cellType && <div className={cellType}></div>}
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="grid">
                {Array.from({ length: gridHeight }, (_, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {Array.from({ length: gridWidth }, (_, colIndex) => (
                            <Cell 
                            key={rowIndex * gridWidth + colIndex} 
                            row={rowIndex}
                            col={colIndex} 
                            />
                        ))}
                    </div>
                ))}
            </div>
            {!playingRef.current && <button className="button" onClick={startGame}>Start Game</button>}
            <h3 className="center">{lose && "You Lose! "} Total Points: {getTotalPoints()}</h3>
        </>
    )
    function getCellType(row, col){
        for(let i=0; i<snake.length; i++){
            const snakeCoord = snake[i]
            if(snakeCoord[0] === row && snakeCoord[1] === col){
                if(snake.length === 1){
                    return "snake head left"
                }
                if(i === 0){
                    const adjacent = snake[i+1]
                    const isVertical = snakeCoord[1] == adjacent[1]
                    const verticalDirection = snakeCoord[0] > adjacent[0] ? "down" : "up"
                    const horizontalDirection = snakeCoord[1] > adjacent[1] ? "right" : "left"
                    const direction = isVertical ? verticalDirection : horizontalDirection
                    return `snake head ${direction}`
                }
                if(i === snake.length - 1){
                    const adjacent = snake[i-1]
                    const isVertical = snakeCoord[1] == adjacent[1]
                    const verticalDirection = snakeCoord[0] > adjacent[0] ? "down" : "up"
                    const horizontalDirection = snakeCoord[1] > adjacent[1] ? "right" : "left"
                    const direction = isVertical ? verticalDirection : horizontalDirection
                    return `snake tail ${direction}`
                }
                const prev = snake[i-1]
                const next = snake[i+1]
                if(prev[1] === next[1]){
                    return "snake body vertical"
                }
                if(prev[0] === next[0]){
                    return "snake body horizontal"
                }
                const toRight = snakeCoord[0] < next[0]
                const fromRight = snakeCoord[0] < prev[0]
                const toUp = snakeCoord[1] < next[1]
                const fromUp = snakeCoord[1] < prev[1]

                if((fromUp && toRight) || (fromRight && toUp)){
                    return "snake body curved up"
                }
                if((!fromUp && toRight) || (fromRight && toUp)){
                    return "snake body curved right"
                }
                if((fromUp && !toRight) || (!fromRight && toUp)){
                    return "snake body curved left"
                }
                if((!fromRight && !toUp)){
                    return "snake body curved down"
                }
                return "snake body curved right"
            }
        }

        if(row === apple[0] && col === apple[1]){
            return "apple"
        }
    
        return null
    }
}