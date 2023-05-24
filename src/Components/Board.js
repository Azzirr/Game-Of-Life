import '../App.css';
import {useState} from 'react';
export default function Board(){
    //create grid
    const rows = 10;
    const cols = 10;

    const [grid, setGrid] = useState(() => {
        const gridRows = [];
        for(let i = 0; i< rows; i++){
            gridRows.push(Array.from(Array(cols), () => 0))
        }
        return gridRows
    })

    // console.table(grid)
    // Start game
    function startGame(){
        let newGrid = [...grid]
        setInterval(() => {
            for(let i = 0; i < rows; i++){
                for(let j = 0; j < cols; j++){
                    let neighbors = 0; // neighbors of current cell
    
                    if(i === 0 || i === rows - 1 || j === 0 || j === cols - 1){
                        newGrid[i][j] = grid[i][j];
                    } else {
                        neighbors += newGrid[i+1][j-1];
                        neighbors += newGrid[i+1][j];
                        neighbors += newGrid[i+1][j+1];
                        neighbors += newGrid[i][j-1];
                        neighbors += newGrid[i][j+1];
                        neighbors += newGrid[i-1][j-1];
                        neighbors += newGrid[i-1][j];
                        neighbors += newGrid[i-1][j+1];
                    }
                    
                    if(neighbors < 2 || neighbors > 3){
                        newGrid[i][j] = 0
                    } else if(grid[i][j] === 0 && neighbors === 3){
                        newGrid[i][j] = 1;
                    }
                }
            }
            setGrid(newGrid)
        }, 1000)        
        // console.log(grid)
    }

    return(
    <div>
    <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 35px)`
    }}>
        {
            grid.map((rows, rowIndex) => 
                rows.map((col, colIndex) => 
                    <div key={colIndex - rowIndex} className={grid[rowIndex][colIndex] ? 'cell cell-alive' : 'cell cell-dead'}
                    onClick={() => {
                        let copyGrid = [...grid];
                        copyGrid[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1;
                        setGrid(copyGrid)
                    }}
                    ></div>)) //generate each cell
        }
    </div>
    <button onClick={startGame}>START</button>
    </div>
    )
}