let copyObjects = require('./copyObjects');


function aStar(mainGrid, startNode, endNode, numRows, numCols){
    
    let grid = copyObjects.copy2dArrayOfObjects(mainGrid);

    let finalArray = []

    // update startNode neighbors (set corners to 14 and horizonals/verticals to 10)
    let {row, col} = startNode

    let topLeftNeighbor = grid[row-1][col-1]
    let topNeighbor = grid[row-1][col]
    let topRightNeighbor = grid[row-1][col+1]
    let rightNeighbor = grid[row][col+1]
    let bottomRighNeighbor = grid[row+1][col+1]
    let bottomNeighbor = grid[row+1][col]
    let bottomLeftNeighbor = grid[row+1][col-1]
    let leftNeighbor = grid[row][col-1]

    topLeftNeighbor.gCost = 14
    topNeighbor.gCost = 10
    topRightNeighbor.gCost = 14
    rightNeighbor.gCost = 10
    bottomRighNeighbor.gCost = 14
    bottomNeighbor.gCost = 10
    bottomLeftNeighbor.gCost = 14
    leftNeighbor.gCost = 10

    //* 1.)
    let open = []
    //* 2.)
    let closed = []
    
    open.push(startNode)

    while(open.length > 0){
        //console.log(1)
        //get node with lowest f cost
        let currentNode = getLowestFCostNodeFromOpenArray(open)        

        if(currentNode.parent != null){
            finalArray.push(currentNode.parent)
        }

        //console.log(`~~ ${currentNode} ~~`)

        removeFromArray(currentNode, open)        

        if(currentNode.row === endNode.row && currentNode.col === endNode.col){            
            console.log("Reached Destination")
            return finalArray
        }
        //console.log(1.5)
        
        if(inClosedArray(currentNode, closed) || currentNode.isWall){
            continue
        }
        closed.push(currentNode)
        //console.log(2)

        let neighbors = getNeighbors(currentNode, grid)

        //console.log(`|||--${neighbors}--|||`)

        for(let index in neighbors){
            console.log(3)
            let currentNeighbor = neighbors[index]

            //console.log(`currentNeighbor: ${currentNeighbor}`)

            if(!inOpenArray(currentNeighbor, open) || currentNeighbor.parent.fCost > currentNode.fCost/* new path to currentNeighbor is shorter */ || currentNeighbor.parent == null){
                //set g cost
                //console.log(4)
                currentNeighbor.gCost = calculateGCost(currentNeighbor, startNode)
                currentNeighbor.hCost = calculateHCost(currentNeighbor, endNode)
                updateFCost(currentNeighbor)
                currentNeighbor.parent = currentNode

                if(!inOpenArray(currentNeighbor, open)){
                    open.push(currentNeighbor)
                }
            }
            //console.log(5)
        }
        

        // calculateGCostOfNeighbors(currentNode, startNode, grid)
        // calculateHCostOfNeighbors(currentNode, endNode)
        // calculateFCostOfNeighbors(currentNode)
        
        

    }

    console.log('did not reach destination')
}

function getNeighbors(currentNode, grid){
    let {row, col} = currentNode

    //the column of the start node detemines the currentNodes gCost
    // Math.abs(col*sqrt(2) - startNode.col*sqrt(2))
    

    let topLeftNeighbor = grid[row-1][col-1]
    let topNeighbor = grid[row-1][col]
    let topRightNeighbor = grid[row-1][col+1]
    let rightNeighbor = grid[row][col+1]
    let bottomRighNeighbor = grid[row+1][col+1]
    let bottomNeighbor = grid[row+1][col]
    let bottomLeftNeighbor = grid[row+1][col-1]
    let leftNeighbor = grid[row][col-1]  

    let arrayOfNeighbors = []

    arrayOfNeighbors.push(topLeftNeighbor)
    arrayOfNeighbors.push(topNeighbor)
    arrayOfNeighbors.push(topRightNeighbor)
    arrayOfNeighbors.push(rightNeighbor)
    arrayOfNeighbors.push(bottomRighNeighbor)
    arrayOfNeighbors.push(bottomNeighbor)
    arrayOfNeighbors.push(bottomLeftNeighbor)
    arrayOfNeighbors.push(leftNeighbor)

    return arrayOfNeighbors

}

// // TODO: G Cost = distance from starting node 
// // TODO: Sometimes you want to update the g cost, sometimes you don't
function calculateGCost(currentNode, startNode){
    let {row, col} = currentNode

    let yDistance = Math.abs(col - startNode.col)
    let xDistance = Math.abs(row - startNode.row)

    let gCost = Math.floor((xDistance + yDistance) * 10)
    
    return gCost
}

// Observation: dont confuse a diagonal g cost and a horizontal g cost being updated
function calculateGCostOfNeighbors(currentNode, startNode, grid){

    let {row, col} = currentNode

    //the column of the start node detemines the currentNodes gCost
    // Math.abs(col*sqrt(2) - startNode.col*sqrt(2))
    

    let topLeftNeighbor = grid[row-1][col-1]
    let topNeighbor = grid[row-1][col]
    let topRightNeighbor = grid[row-1][col+1]
    let rightNeighbor = grid[row][col+1]
    let bottomRighNeighbor = grid[row+1][col+1]
    let bottomNeighbor = grid[row+1][col]
    let bottomLeftNeighbor = grid[row+1][col-1]
    let leftNeighbor = grid[row][col-1]    

    topLeftNeighbor.gCost += Math.abs(col*Math.sqrt(2)*10 - startNode.col*Math.sqrt(2)*10) //14
    topNeighbor.gCost += Math.abs(col - startNode.col)
    topRightNeighbor.gCost += Math.abs(col*Math.sqrt(2)*10 - startNode.col*Math.sqrt(2)*10) //14
    rightNeighbor.gCost += Math.abs(col - startNode.col)
    bottomRighNeighbor.gCost += Math.abs(col*Math.sqrt(2)*10 - startNode.col*Math.sqrt(2)*10) //14
    bottomNeighbor.gCost += Math.abs(col - startNode.col)
    bottomLeftNeighbor.gCost += Math.abs(col*Math.sqrt(2)*10 - startNode.col*Math.sqrt(2)*10) //14
    leftNeighbor.gCost += Math.abs(col - startNode.col)
    
}

// ! H cost = distance from end node
function calculateHCost(currentNode, endNode){    
    let {row, col} = currentNode
    return Math.floor(Math.sqrt((row-endNode.row)*2 + (col-endNode.col)*2))
}

function calculateHCostOfNeighbors(currentNode, endNode, grid){

    let {row, col} = currentNode

    let topLeftNeighbor = grid[row-1][col-1]
    let topNeighbor = grid[row-1][col]
    let topRightNeighbor = grid[row-1][col+1]
    let rightNeighbor = grid[row][col+1]
    let bottomRighNeighbor = grid[row+1][col+1]
    let bottomNeighbor = grid[row+1][col]
    let bottomLeftNeighbor = grid[row+1][col-1]
    let leftNeighbor = grid[row][col-1]

    topLeftNeighbor.hCost = calculateHCost(topLeftNeighbor, endNode)
    topNeighbor.hCost = calculateHCost(topNeighbor, endNode)
    topRightNeighbor.hCost = calculateHCost(topRightNeighbor, endNode)
    rightNeighbor.hCost = calculateHCost(rightNeighbor, endNode)
    bottomRighNeighbor.hCost = calculateHCost(bottomRighNeighbor, endNode)
    bottomNeighbor.hCost = calculateHCost(bottomNeighbor, endNode)
    bottomLeftNeighbor.hCost = calculateHCost(bottomLeftNeighbor, endNode)
    leftNeighbor.hCost = calculateHCost(leftNeighbor, endNode)
    
}

// ! F cost = G cost + H cost
function updateFCost(currentNode){
    currentNode.fcost = currentNode.gCost + currentNode.hCost
    return
}

function calculateFCostOfNeighbors(currentNode, grid){

    let {row, col} = currentNode    

    let topLeftNeighbor = grid[row-1][col-1]
    let topNeighbor = grid[row-1][col]
    let topRightNeighbor = grid[row-1][col+1]
    let rightNeighbor = grid[row][col+1]
    let bottomRighNeighbor = grid[row+1][col+1]
    let bottomNeighbor = grid[row+1][col]
    let bottomLeftNeighbor = grid[row+1][col-1]
    let leftNeighbor = grid[row][col-1]

    updateFCost(topLeftNeighbor)
    updateFCost(topNeighbor)
    updateFCost(topRightNeighbor)
    updateFCost(rightNeighbor)
    updateFCost(bottomRighNeighbor)
    updateFCost(bottomNeighbor)
    updateFCost(bottomLeftNeighbor)
    updateFCost(leftNeighbor)    

}

// // TODO: May need to modify this so that the open array is being searched
function getLowestFCostNodeFromOpenArray(open){
    let min = Infinity
    let minNode = null

    for(let index in open){
        //console.log("in ----")
        let currentNode = open[index]
        if(currentNode.fCost < min){
            min = currentNode.fCost
            minNode = currentNode
        }
    }
    // console.log(`Here is the min: ${min}`)
    // console.log(`Here is the node: ${minNode}`)

    return minNode
}

function getLowestHCostFromNeighbors(currentNode, grid){

    let {row, col} = currentNode

    let topLeftNeighbor = grid[row-1][col-1]
    let topNeighbor = grid[row-1][col]
    let topRightNeighbor = grid[row-1][col+1]
    let rightNeighbor = grid[row][col+1]
    let bottomRighNeighbor = grid[row+1][col+1]
    let bottomNeighbor = grid[row+1][col]
    let bottomLeftNeighbor = grid[row+1][col-1]
    let leftNeighbor = grid[row][col-1]

    let arrayOfNeighbors = []

    arrayOfNeighbors.push(topLeftNeighbor)
    arrayOfNeighbors.push(topNeighbor)
    arrayOfNeighbors.push(topRightNeighbor)
    arrayOfNeighbors.push(rightNeighbor)
    arrayOfNeighbors.push(bottomRighNeighbor)
    arrayOfNeighbors.push(bottomNeighbor)
    arrayOfNeighbors.push(bottomLeftNeighbor)
    arrayOfNeighbors.push(leftNeighbor)

    let min = Infinity
    let minNode = null

    for(let index in arrayOfNeighbors){
        currentNode = arrayOfNeighbors[index]
        if(currentNode.hCost < min){
            min = currentNode.hCost
            minNode = currentNode
        }
    }

    return minNode
}

function inClosedArray(node, closed){

    let {row, col} = node    

    for(let i = 0; i < closed.length; i++){    
        console.log("-")
        let currentNode = closed[i]
        if(row === currentNode.row && col === currentNode.col){
            return true
        }
    }

    return false
}

function inOpenArray(node, open){

    let {row, col} = node    

    for(let index in open){
        let currentNode = open[index]
        if(row === currentNode.row && col === currentNode.col){
            return true
        }
    }

    return false
}

function removeFromArray(node, array){

    let {row, col} = node

    for(let index in array){
       let currentNode = array[index]

       if(currentNode.row === row && currentNode.col === col){
            array.splice(index, 1);
       }
   } 
}

//used in case where neighbors have multiple nodes with the smallest fcost
function hasMultipleNeigborsWithSmallestFCost(currentNode, fcost, grid, open){
    let {row, col} = currentNode

    let topLeftNeighbor = grid[row-1][col-1]
    let topNeighbor = grid[row-1][col]
    let topRightNeighbor = grid[row-1][col+1]
    let rightNeighbor = grid[row][col+1]
    let bottomRightNeighbor = grid[row+1][col+1]
    let bottomNeighbor = grid[row+1][col]
    let bottomLeftNeighbor = grid[row+1][col-1]
    let leftNeighbor = grid[row][col-1]

    let arrayOfNeighbors = []

    if(inOpenArray(topLeftNeighbor,open)) arrayOfNeighbors.push(topLeftNeighbor.fCost)
    if(inOpenArray(topNeighbor,open)) arrayOfNeighbors.push(topNeighbor.fCost)
    if(inOpenArray(topRightNeighbor,open)) arrayOfNeighbors.push(topRightNeighbor.fCost)
    if(inOpenArray(rightNeighbor,open)) arrayOfNeighbors.push(rightNeighbor.fCost)
    if(inOpenArray(bottomRightNeighbor,open)) arrayOfNeighbors.push(bottomRightNeighbor.fCost)
    if(inOpenArray(bottomNeighbor,open)) arrayOfNeighbors.push(bottomNeighbor.fCost)
    if(inOpenArray(bottomLeftNeighbor,open)) arrayOfNeighbors.push(bottomLeftNeighbor.fCost)
    if(inOpenArray(leftNeighbor,open)) arrayOfNeighbors.push(leftNeighbor.fCost)

    arrayOfNeighbors.sort()

    for(let i = 0; i < arrayOfNeighbors.length-1; i++){
        let currentNeighborFCost = arrayOfNeighbors[i]
        let nextNeighborFCost = arrayOfNeighbors[i+1]

        if(currentNeighborFCost === fcost){
            if(nextNeighborFCost === fcost){
                return true
            }
        }
    }

    return false
}

module.exports = aStar;



/*
 * Euclidean Distance Heuristic:
 * h = sqrt ( (current_cell.x – goal.x)2 + (current_cell.y – goal.y)2 ) 

! Cost = distance from starting node 
    ? -top left corner

! H cost = distance from end node
    ? -top right corner    

! F cost = G cost + H cost
    ? - center

*/