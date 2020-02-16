let copyObjects = require('./copyObjects');

//Pick random number between 1 and 4: Math.floor(Math.random()*4)

function generateMaze(mainGrid, numRows, numCols){
    let grid = copyObjects.copy2dArrayOfObjects(mainGrid);
    let result = []

    createChamber(grid, result, numRows, numCols)

    let topLeftNode = grid[0][0]
    let bottomRightNode = grid[numRows-1][numCols-1]
    
    generateMazeRec(grid, topLeftNode, bottomRightNode, result);
    
    console.log('done')
    return result

}

function generateMazeRec(grid, topLeftNode, bottomRightNode, result){    

    let numRows = bottomRightNode.row-1
    let numCols = bottomRightNode.col-1    

    let width = bottomRightNode.col - topLeftNode.col
    let height = bottomRightNode.row - topLeftNode.row

    let orientation = chooseOrientation(width, height)

    if(orientation === 1 /* is horizontal */){

    } else {/* is verical */
        //let newCorners = bisectVertically(grid, topLeftNode, bottomRightNode, numRows, numCols, result)  
        let newCorners = bisectHorizontally(grid, topLeftNode, bottomRightNode, numRows, numCols, result)  
        let newTopLeftNode = newCorners[0]
        let newBottomRightNode = newCorners[1]
        
        //console.log(`new corners: topLeft: (${newCorners[0].row}, ${newCorners[0].col}) bottomRight: (${newCorners[1].row}, ${newCorners[1].col})`)
        console.log(`new corners: topLeft: (${newTopLeftNode.row}, ${newTopLeftNode.col}) bottomRight: (${newBottomRightNode.row}, ${newBottomRightNode.col})`)
    }
    
}

function generateMazeRec1(grid, topLeftNode, bottomRightNode, numRows, numCols, result){
    let width = Math.abs(bottomRightNode.col - topLeftNode.col)
    let height = Math.abs(bottomRightNode.row - topLeftNode.row)
    let orientation = chooseOrientation(width, height)

    let newTopLeftNode = null
    let newBottomRightNode = null    

    //horizontal
    if(orientation === 1){        

        //bisectHorizontally(grid, topLeftNode, bottomRightNode, numRows, numCols, newTopLeftNode, newBottomRightNode, result)
        
        console.log("H " + newTopLeftNode)
        console.log("H " + newBottomRightNode)
        
        //recurse on above

        //recurse on below

    //vertical
    } else if(orientation === 0){        

       // bisectVertically(grid, topLeftNode, bottomRightNode, numRows, numCols, newTopLeftNode, newBottomRightNode, result)

        console.log("V " + newTopLeftNode)
        console.log("V " + newBottomRightNode)

        //recurse on right


        //recurse on left

    }

    



}

function createChamber(grid, result, numRows, numCols){
    for(let i = 0; i < numCols; i++){
        grid[0][i].isWall = true
        result.push(grid[0][i])
    }

    for(let i = 0; i < numRows; i++){
        grid[i][numCols-1].isWall = true;
        result.push(grid[i][numCols-1])
    }

    for(let i = numCols-1; i > 0; i--){
        grid[numRows-1][i].isWall = true;
        result.push(grid[numRows-1][i])
    }

    for(let i = numRows-1; i > 0; i--){
        grid[i][0].isWall = true
        result.push(grid[i][0])
    }
}

function bisectHorizontally(grid, topLeftNode, bottomRightNode, numRows, numCols, result){
    let randomRowIndex = getRandomNumberBetween(topLeftNode.row+2, bottomRightNode.row-1)    
    let randomGap = getRandomNumberBetween(topLeftNode.col+2, bottomRightNode.col-1) //6
    console.log("random row: " + randomRowIndex)
    console.log("random gap: " + randomGap)

    for(let i = topLeftNode.row; i < bottomRightNode.col; i++){
        //console.log("in")
        if(i === randomGap || grid[randomRowIndex][i].isStart === true || grid[randomRowIndex][i].isFinish === true){
            continue
        }
        grid[randomRowIndex][i].isWall = true;        
        result.push(grid[randomRowIndex][i])
    }

    let newTopLeftNode = grid[randomRowIndex][topLeftNode.col]
    let newBottomRightNode = grid[bottomRightNode.row][bottomRightNode.col]
    return [newTopLeftNode, newBottomRightNode]
}

function bisectVertically(grid, topLeftNode, bottomRightNode, numRows, numCols, result){
    let randomColIndex = getRandomNumberBetween(topLeftNode.row+2, bottomRightNode.col-1)    
    let randomGap = getRandomNumberBetween(topLeftNode.row+2, bottomRightNode.row-1) //6
    
    console.log(randomColIndex)
    console.log(randomGap)

    for(let i = topLeftNode.row; i < bottomRightNode.row; i++){        
        if(i === randomGap || grid[i][randomColIndex].isStart === true || grid[i][randomColIndex].isFinish){
            continue
        }
        grid[i][randomColIndex].isWall = true;        
        result.push(grid[i][randomColIndex])
    }
    
    let newTopLeftNode = grid[topLeftNode.row][randomColIndex]
    let newBottomRightNode = grid[bottomRightNode.row][bottomRightNode.col]
    
    return [newTopLeftNode, newBottomRightNode]
    
}

function getRandomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function chooseOrientation(width, height){
    if(width < height){
        return 1 // ! means: return 'horizontal'
    } else if(width > height){
        return 0 // ! means: return 'vertical'
    }
    let rand = getRandomNumberBetween(0,2)
    if(rand === 1){
        return 1
    } else {
        return 0
    }
}

module.exports = generateMaze;