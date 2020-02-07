let copyObjects = require('./copyObjects');


function aStar(mainGrid, startNode, endNode, numRows, numCols){
    
    let grid = copyObjects.copy2dArrayOfObjects(mainGrid);

    //update startNode
    updateCostOfNeighbors(grid, startNode, true)

    //* 1.)
    let open = []
    //* 2.)
    let closed = []
    
    open.push(startNode)

    //* 3.) 
    while(!open.empty()){
        //* a.)
        let nodeWithLowestFCost = getLowestFCost(open) //! q
        //* b.)
        removeFromArray(nodeWithLowestFCost, open)
        // TODO: c.)
        let neighbors = getNeighbors(nodeWithLowestFCost)

        updateNeighborsOfLowestCostNode(nodeWithLowestFCost, neighbors)
        //* d.)
        for(let index in neighbors){
            let currentNeighbor = neighbors[index]
            let {row, col} = currentNeighbor
            //* i.)
            if(row === endNode.row && col === endNode.col){
                currentNeighbor.gCost = nodeWithLowestFCost.gCost + ()//TODO: distance between successor and q
                currentNeighbor.hCost = //TODO: distance from goal to successor
                currentNeighbor.fCost = currentNeighbor.gCost + currentNeighbor.hCost
            }

            if(){

                continue
            }

            if(){

                continue
            }

            openList.push(currentNeighbor)

        }

        closed.push(nodeWithLowestFCost)
    }

}

// function updateCostOfNeighbors(grid, currentNode, endNode, isStartNode){

//     let {row, col} = currentNode;    

//     if(isStartNode){
//         let topLeftNeighbor = grid[row-1][col-1]
//         let topNeighbor = grid[row-1][col]
//         let topRighNeighbor = grid[row-1][col+1]
//         let rightNeighbor = grid[row][col+1]
//         let bottomRighNeighbor = grid[row+1][col+1]
//         let bottomNeighbor = grid[row+1][col]
//         let bottomLeftNeighbor = grid[row+1][col-1]

//         //calculate gCost of neighbors for start node
//         topLeftNeighbor.gCost = Math.sqrt(2) * 10
//         topNeighbor.gCost = 1 * 10
//         topRighNeighbor.gCost = Math.sqrt(2) * 10
//         rightNeighbor.gCost = 1 * 10
//         bottomRighNeighbor.gCost = Math.sqrt(2) * 10
//         bottomNeighbor.gCost = 1 * 10
//         bottomLeftNeighbor.gCost = Math.sqrt(2) * 10

//         //calculate gCost of neighbors for start node

//     }

// }

// ! G Cost = distance from starting node 
function calculateGCostOfNeighbors(currentNode, grid){

    let {row, col} = currentNode

    let topLeftNeighbor = grid[row-1][col-1]
    let topNeighbor = grid[row-1][col]
    let topRightNeighbor = grid[row-1][col+1]
    let rightNeighbor = grid[row][col+1]
    let bottomRighNeighbor = grid[row+1][col+1]
    let bottomNeighbor = grid[row+1][col]
    let bottomLeftNeighbor = grid[row+1][col-1]
    let leftNeighbor = grid[row][col-1]

    topLeftNeighbor.gCost += 14
    topNeighbor.gCost += 10
    topRightNeighbor.gCost += 14
    rightNeighbor.gCost += 10
    bottomRighNeighbor.gCost += 14
    bottomNeighbor.gCost += 10
    bottomLeftNeighbor.gCost += 14
    leftNeighbor.gCost += 10

    return
}

// ! H cost = distance from end node
function calculateHCost(currentNode, endNode){
    
    let {row, col} = currentNode

    return Math.floor(sqrt((row-endNode.row)*2 + (col-endNode.col)*2))
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

    return
}

// ! F cost = G cost + H cost
function updateFCost(currentNode){

    currentNeighbor.fcost = currentNode.gCost + currentNode.hCost

    return
}

function calculateFCostOfNeighbors(currentNode, grid){

    let {row, col} = currentNode

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

    return

}

function getLowestHCostFromNeighbors(currentNode, grid){

        let {row, col} = currentNode

        let topLeftNeighbor = grid[row-1][col-1]
        let topNeighbor = grid[row-1][col]
        let topRighNeighbor = grid[row-1][col+1]
        let rightNeighbor = grid[row][col+1]
        let bottomRighNeighbor = grid[row+1][col+1]
        let bottomNeighbor = grid[row+1][col]
        let bottomLeftNeighbor = grid[row+1][col-1]
        let leftNeighbor = grid[row][col-1]

        let arrayOfNeighbors = []

        arrayOfNeighbors.push(topLeftNeighbor)
        arrayOfNeighbors.push(topNeighbor)
        arrayOfNeighbors.push(topRighNeighbor)
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


module.exports = aStar;



/*

 * h = sqrt ( (current_cell.x – goal.x)2 + (current_cell.y – goal.y)2 ) 

! Cost = distance from starting node 
    ? -top left corner

! H cost = distance from end node
    ? -top right corner    

! F cost = G cost + H cost
    ? - center

*/