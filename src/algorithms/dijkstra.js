// const node = {
//     row,
//     col,
//     isVisited,
//     distance
// };

class Node {
    constructor(isVisited, distance){        
        this.isVisited = isVisited;
        this.distance = distance;
    }
}

const gridRow = 10;
const gridCol = 10;

function createGrid() {
    const grid = [];
    for(let row = 0; row < gridRow; row++){
        const row = [];
        for(let col = 0; col < gridCol; col++){
            const node = new Node(false, 0);
            row.push(node);
            //row.push("*");
        }
        grid.push(row);
    }
    return grid;
}

function printGrid(grid, row, col){
    for(let r = 0; r < row; r++){        
        for(let c = 0; c < col; c++){
            //process.stdout.write(grid[r][c] + " ");
            process.stdout.write(grid[r][c].distance + " ");
        }
        console.log();        
    }
}

const grid = createGrid();

printGrid(grid, gridRow, gridCol);

function dijkstra(grid, startNode, finish){
    
}