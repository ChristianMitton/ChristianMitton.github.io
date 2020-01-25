let Queue = require('../dataStructures/Queue');
let GraphNode = require('../dataStructures/GraphNode');
let Graph = require('../dataStructures/Graph');

let numRows = 5;
let numCols = 5;

let graph = new Graph(numRows,numCols);

graph.printGrid();

let t1 = graph.grid[1][3];
let t2 = graph.grid[4][4];
//let t2 = new GraphNode("<node>", 5,5);

function bfs(graph, startNode, endNode){    
    console.log(`Start Node: row:${startNode.row} col:${startNode.col}`);
    console.log(`End Node: row:${endNode.row} col:${endNode.col}`);
    console.log();
    let queue = new Queue();

    graph.grid[startNode.row][startNode.col].visited = true;
    queue.enqueue(startNode);   

    while(!queue.isEmpty()){
        let currentNode = queue.dequeue();
        //TODO: do something visually with current node       
        let {row, col} = currentNode;        

        console.log(`currentNode: <node>(${row},${col})`);

        if(row == endNode.row && col == endNode.col){
            //TODO: do something visually with final node
            console.log("Reached destination");
            return;
        }
        
        addChildrenToQueue(graph, currentNode, queue); 

        process.stdout.write("Queue contents after adding children:");
        queue.printGraphQueue();
    }

    console.log("Did not reach destination");
}

function addChildrenToQueue(graph, currentNode, queue){

    let {row, col} = currentNode;    

    /*
    ?   -----------------
    ?   Corner edge cases
    ?   -----------------
    */
    //! top left corner
    if(row == 0 && col == 0) {            
        //right child
        if(!graph.grid[row][col+1].visited){
            graph.grid[row][col+1].visited = true;
            queue.enqueue(graph.grid[row][col+1])
        }
        //bottom child
        if(!graph.grid[row+1][col].visited){
            graph.grid[row+1][col].visited = true;
            queue.enqueue(graph.grid[row+1][col])    
        }
        return;             
    }
    //! top right corner
    else if(row == 0 && col == (numCols-1)){
        //left child
        if(!graph.grid[row][col-1].visited){
            graph.grid[row][col-1].visited = true;
            queue.enqueue(graph.grid[row][col-1]) 
        }
        //bottom child
        if(!graph.grid[row+1][col].visited){
            graph.grid[row+1][col].visited = true;
            queue.enqueue(graph.grid[row+1][col]) 
        }
        return;
    }
    //! bottom right corner
    else if(row == (numRows-1) && col == (numCols-1)){
        //left child
        if(!graph.grid[row][col-1].visited){
            graph.grid[row][col-1].visited = true;
            queue.enqueue(graph.grid[row][col-1]) 
        }
        //top child
        if(!graph.grid[row-1][col].visited){
            graph.grid[row-1][col].visited = true;
            queue.enqueue(graph.grid[row-1][col]) 
        }
        return;
    }
    //! bottom left corner
    else if(row == (numRows-1) && col == 0){
        //right child
        if(!graph.grid[row][col+1].visited){
            graph.grid[row][col+1].visited = true;
            queue.enqueue(graph.grid[row][col+1]) 
        }
        //top child
        if(!graph.grid[row-1][col].visited){
            graph.grid[row-1][col].visited = true;
            queue.enqueue(graph.grid[row-1][col]) 
        }
        return;
    }
    /*
    ?   -----------------
    ?   Border edge cases
    ?   -----------------
    */
    //! top border
    else if(row == 0){
        //left child  
        if(!graph.grid[row][col-1].visited){
            graph.grid[row][col-1].visited = true;
            queue.enqueue(graph.grid[row][col-1])            
        }
        //right child
        if(!graph.grid[row][col+1].visited){
            graph.grid[row][col+1].visited = true;
            queue.enqueue(graph.grid[row][col+1]) 
        }
        //bottom child
        if(!graph.grid[row+1][col].visited){
            graph.grid[row+1][col].visited = true;
            queue.enqueue(graph.grid[row+1][col]) 
        }
        return;
    }
    //! right border
    else if(col == numCols-1){
        //left child
        if(!graph.grid[row][col-1].visited){
            graph.grid[row][col-1].visited = true;
            queue.enqueue(graph.grid[row][col-1])            
        }
        //top child
        if(!graph.grid[row-1][col].visited){
            graph.grid[row-1][col].visited = true;
            queue.enqueue(graph.grid[row-1][col]) 
        }
        //bottom child
        if(!graph.grid[row+1][col].visited){
            graph.grid[row+1][col].visited = true;
            queue.enqueue(graph.grid[row+1][col]) 
        }
        return;
    }
    //! bottom border
    else if(row == numRows-1){
        //left child
        if(!graph.grid[row][col-1].visited){
            graph.grid[row][col-1].visited = true;
            queue.enqueue(graph.grid[row][col-1])            
        }
        //top child
        if(!graph.grid[row-1][col].visited){
            graph.grid[row-1][col].visited = true;
            queue.enqueue(graph.grid[row-1][col]) 
        }
        //right child
        if(!graph.grid[row][col+1].visited){
            graph.grid[row][col+1].visited = true;
            queue.enqueue(graph.grid[row][col+1]) 
        }
        return;
    }
    //! left border
    else if(col == 0){
        //top child
        if(!graph.grid[row-1][col].visited){
            graph.grid[row-1][col].visited = true;
            queue.enqueue(graph.grid[row-1][col]) 
        }
        //right child
        if(!graph.grid[row][col+1].visited){
            graph.grid[row][col+1].visited = true;
            queue.enqueue(graph.grid[row][col+1]) 
        } 
        //bottom child
        if(!graph.grid[row+1][col].visited){
            graph.grid[row+1][col].visited = true;
            queue.enqueue(graph.grid[row+1][col]) 
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
        if(!graph.grid[row-1][col].visited){
            graph.grid[row-1][col].visited = true;
            queue.enqueue(graph.grid[row-1][col]) 
        }
        //right child
        if(!graph.grid[row][col+1].visited){
            graph.grid[row][col+1].visited = true;
            queue.enqueue(graph.grid[row][col+1]) 
        } 
        //bottom child
        if(!graph.grid[row+1][col].visited){
            graph.grid[row+1][col].visited = true;
            queue.enqueue(graph.grid[row+1][col]) 
        } 
        //left child
        if(!graph.grid[row][col-1].visited){
            graph.grid[row][col-1].visited = true;
            queue.enqueue(graph.grid[row][col-1])            
        }
    }   

    return;
}

bfs(graph, t1, t2);