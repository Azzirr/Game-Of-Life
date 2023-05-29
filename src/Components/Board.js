import '../App.css';
import {useState} from 'react';
export default function Board(){
    //create grid
    const rows = 30;
    const cols = 30;

    let [grid, setGrid] = useState(() => {
        const gridRows = [];
        for(let i = 0; i< rows; i++){
            gridRows.push(Array.from(Array(cols), () => 0))
        }
        return gridRows
    })

    // Start game
    const neighborsOperations = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
        [-1, -1]
    ]
    function startGame(){
        setInterval(() => {
            setGrid((grid) => {
                const newGrid = grid.map((row, i) => {
                    return row.map((col, j) => {
                        let neighbors = 0;
                        neighborsOperations.forEach(([x, y]) => {
                            const neighborI = i + x;
                            const neighborJ = j + y;
                            if(neighborI >= 0 && neighborI < rows && neighborJ >= 0 && neighborJ < cols){
                                neighbors += grid[neighborI][neighborJ]
                            }
                        })
                        if(neighbors > 3 || neighbors < 2){
                            return 0;
                        } else if(neighbors === 3){
                            return 1;
                        } else {
                            return grid[i][j]
                        }
                    })
                })
                return newGrid;
            })
        }, 1000)
    }

    return(
    <div>
    <button onClick={startGame}>START</button>
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
    </div>
    )
}