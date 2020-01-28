let Queue = require('../dataStructures/Queue');
// let GraphNode = require('../dataStructures/GraphNode');
// let Graph = require('../dataStructures/Graph');

// let numRows = 5;
// let numCols = 5;

// let graph = new Graph(numRows,numCols);

// graph.printGrid();

// let t1 = grid[2][2];
// let t2 = grid[4][4];
//let t2 = new GraphNode("<node>", 5,100);
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    let copy = new obj.constructor();
    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function copy2dArrayOfObjects(array){
    let result = []
    for(let row in array){
        let newRow = []
        for(let col in array[row]){
            let copiedObj = clone(array[row][col]);
            newRow.push(copiedObj);
        }
        result.push(newRow);
    }

    return result;
}

function bfs(mainGrid, startNode, endNode, numRows, numCols){    
    console.log(`Start Node: row:${startNode.row} col:${startNode.col}`);
    console.log(`End Node: row:${endNode.row} col:${endNode.col}`);
    console.log();
    let queue = new Queue();

    //console.log(`Here is the main grid after splicing: ${mainGrid}`);
    //let grid = [...mainGrid];
    let grid = copy2dArrayOfObjects(mainGrid);
    //console.log(`Here is the temp grid after splicing: ${grid}`);

    let visitedNodes = [];    
    
    grid[startNode.row][startNode.col].visited = true;

    queue.enqueue(startNode);   

    while(!queue.isEmpty()){
        let currentNode = queue.dequeue();        
        // append current node to visited array
        visitedNodes.push(currentNode);

        let {row, col} = currentNode;        

        //console.log(`currentNode: <node>(${row},${col})`);

        if(row === endNode.row && col === endNode.col){            
            console.log("Reached destination");
            return visitedNodes;
        }
        
        addChildrenToQueue(grid, currentNode, queue, numRows, numCols); 

        //process.stdout.write("Queue contents after adding children:");
        //queue.printGraphQueue();
    }

    console.log("Did not reach destination");
    return visitedNodes;
}

function addChildrenToQueue(grid, currentNode, queue, numRows, numCols){    

    let {row, col} = currentNode;    

    /*
    ?   -----------------
    ?   Corner edge cases
    ?   -----------------
    */
    //! top left corner
    if(row === 0 && col === 0) {            
        //right child
        if(!grid[row][col+1].visited){
            grid[row][col+1].visited = true;
            queue.enqueue(grid[row][col+1])
        }
        //bottom child
        if(!grid[row+1][col].visited){
            grid[row+1][col].visited = true;
            queue.enqueue(grid[row+1][col])    
        }
        return;             
    }
    //! top right corner
    else if(row === 0 && col === (numCols-1)){
        //left child
        if(!grid[row][col-1].visited){
            grid[row][col-1].visited = true;
            queue.enqueue(grid[row][col-1]) 
        }
        //bottom child
        if(!grid[row+1][col].visited){
            grid[row+1][col].visited = true;
            queue.enqueue(grid[row+1][col]) 
        }
        return;
    }
    //! bottom right corner
    else if(row === (numRows-1) && col === (numCols-1)){
        //left child
        if(!grid[row][col-1].visited){
            grid[row][col-1].visited = true;
            queue.enqueue(grid[row][col-1]) 
        }
        //top child
        if(!grid[row-1][col].visited){
            grid[row-1][col].visited = true;
            queue.enqueue(grid[row-1][col]) 
        }
        return;
    }
    //! bottom left corner
    else if(row === (numRows-1) && col === 0){
        //right child
        if(!grid[row][col+1].visited){
            grid[row][col+1].visited = true;
            queue.enqueue(grid[row][col+1]) 
        }
        //top child
        if(!grid[row-1][col].visited){
            grid[row-1][col].visited = true;
            queue.enqueue(grid[row-1][col]) 
        }
        return;
    }
    /*
    ?   -----------------
    ?   Border edge cases
    ?   -----------------
    */
    //! top border
    else if(row === 0){
        //left child  
        if(!grid[row][col-1].visited){
            grid[row][col-1].visited = true;
            queue.enqueue(grid[row][col-1])            
        }
        //right child
        if(!grid[row][col+1].visited){
            grid[row][col+1].visited = true;
            queue.enqueue(grid[row][col+1]) 
        }
        //bottom child
        if(!grid[row+1][col].visited){
            grid[row+1][col].visited = true;
            queue.enqueue(grid[row+1][col]) 
        }
        return;
    }
    //! right border
    else if(col === numCols-1){
        //left child
        if(!grid[row][col-1].visited){
            grid[row][col-1].visited = true;
            queue.enqueue(grid[row][col-1])            
        }
        //top child
        if(!grid[row-1][col].visited){
            grid[row-1][col].visited = true;
            queue.enqueue(grid[row-1][col]) 
        }
        //bottom child
        if(!grid[row+1][col].visited){
            grid[row+1][col].visited = true;
            queue.enqueue(grid[row+1][col]) 
        }
        return;
    }
    //! bottom border
    else if(row === numRows-1){
        //left child
        if(!grid[row][col-1].visited){
            grid[row][col-1].visited = true;
            queue.enqueue(grid[row][col-1])            
        }
        //top child
        if(!grid[row-1][col].visited){
            grid[row-1][col].visited = true;
            queue.enqueue(grid[row-1][col]) 
        }
        //right child
        if(!grid[row][col+1].visited){
            grid[row][col+1].visited = true;
            queue.enqueue(grid[row][col+1]) 
        }
        return;
    }
    //! left border
    else if(col === 0){
        //top child
        if(!grid[row-1][col].visited){
            grid[row-1][col].visited = true;
            queue.enqueue(grid[row-1][col]) 
        }
        //right child
        if(!grid[row][col+1].visited){
            grid[row][col+1].visited = true;
            queue.enqueue(grid[row][col+1]) 
        } 
        //bottom child
        if(!grid[row+1][col].visited){
            grid[row+1][col].visited = true;
            queue.enqueue(grid[row+1][col]) 
        } 
        return;
    } 
    /*
    ?   ------------
    ?   General Node
    ?   ------------
    */
    else {
        //top child
        if(!grid[row-1][col].visited){
            grid[row-1][col].visited = true;
            queue.enqueue(grid[row-1][col]) 
        }
        //right child
        if(!grid[row][col+1].visited){
            grid[row][col+1].visited = true;
            queue.enqueue(grid[row][col+1]) 
        } 
        //bottom child
        if(!grid[row+1][col].visited){
            grid[row+1][col].visited = true;
            queue.enqueue(grid[row+1][col]) 
        } 
        //left child
        if(!grid[row][col-1].visited){
            grid[row][col-1].visited = true;
            queue.enqueue(grid[row][col-1])            
        }
    }   

    return;
}

//bfs(graph, t1, t2);

//export default bfs;
module.exports = bfs;
module.exports.copy2dArrayOfObjects = copy2dArrayOfObjects;