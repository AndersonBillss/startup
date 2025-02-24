import React, { useState } from "react";
import "./snake.css"

export default function Snake(){
    const gridWidth = 10
    const gridHeight = 10
    const startingSnake = [
        [4,4], 
        [4,5],
    ]
    const [snake, setSnake] = useState(startingSnake)


    function getSnakeCellType(row, col){
        for(let i=0; i<snake.length; i++){
            const snakeCoord = snake[i]
            if(snakeCoord[0] === row && snakeCoord[1] === col){
                if(i === 0){
                    const adjacent = snake[i+1]
                    const isVertical = snakeCoord[1] == adjacent[1]
                    const verticalDirection = snakeCoord[0] > adjacent[0] ? "down" : "up"
                    const horizontalDirection = snakeCoord[1] > adjacent[1] ? "right" : "left"
                    const direction = isVertical ? verticalDirection : horizontalDirection
                    return `head ${direction}`
                }
                if(i === snake.length - 1){
                    const adjacent = snake[i-1]
                    const isVertical = snakeCoord[1] == adjacent[1]
                    const verticalDirection = snakeCoord[0] > adjacent[0] ? "down" : "up"
                    const horizontalDirection = snakeCoord[1] > adjacent[1] ? "right" : "left"
                    const direction = isVertical ? verticalDirection : horizontalDirection
                    return `tail ${direction}`
                }
                const prev = snake[i-1]
                const next = snake[i+1]
                if(prev[1] === next[1]){
                    return "body vertical"
                }
                if(prev[0] === next[0]){
                    return "body horizontal"
                }
                const toRight = snakeCoord[0] < next[0]
                const fromRight = snakeCoord[0] < prev[0]
                const toUp = snakeCoord[1] < next[1]
                const fromUp = snakeCoord[1] < prev[1]

                if((fromUp && toRight) || (fromRight && toUp)){
                    return "body curved up"
                }
                if((!fromUp && toRight) || (fromRight && toUp)){
                    return "body curved right"
                }
                if((fromUp && !toRight) || (!fromRight && toUp)){
                    return "body curved left"
                }
                if((!fromUp && !toRight) || (!fromRight && !fromUp)){
                    return "body curved down"
                }
                return "body curved"
            }
        }
    
        return null
    }
    
    const Cell = ({row, col}) => {
        const snakeCellType = getSnakeCellType(row, col)
        return( 
            <div className="cell">
                <div className="snake-container">
                    {snakeCellType && <div className={"snake " + snakeCellType}></div>}
                </div>
            </div>
        )
    }

    return (
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
    )
}