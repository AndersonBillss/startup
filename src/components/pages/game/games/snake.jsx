import React, { useState } from "react";
import "./snake.css"

export default function Snake(){
    const gridWidth = 10
    const gridHeight = 10
    const snake1 = [
        [4,4], 
        [4,5]
    ]
    const snake2 = [
        [2,2],
        [2,3],
        [3,3],
        [4,3]
    ]
    const [snake, setSnake] = useState(snake1)


    function getSnakeCellType(row, col){
        
        for(let i=0; i<snake.length; i++){
            const snakeCoord = snake[i]
            if(snakeCoord[0] === row && snakeCoord[1] === col){
                if(i === 0){
                    const adjacent = snake[i+1]
                    const isVertical = snakeCoord[1] == adjacent[1]
                    const verticalDirection = snakeCoord[0] > adjacent[0] ? "up" : "down"
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
                return "body horizontal"
            }
        }
    
        return null
    }
    
    const Cell = ({row, col}) => {
        const snakeCellType = getSnakeCellType(row, col)
        return( 
            <div className="cell">
                {snakeCellType && <div className={"snake " + snakeCellType}></div>}
            </div>
        )
    }

    return (
        <div className="grid">
            {Array.from({ length: gridHeight }, (_, rowIndex) => (
                <div className="row" key={rowIndex}>
                    {Array.from({ length: gridWidth }, (_, colIndex) => (
                        // <div key={rowIndex * gridWidth + colIndex} className="cell"></div>
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