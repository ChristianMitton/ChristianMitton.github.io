import React, { Component } from 'react';

import Node from './Node/Node';
import '../styles/style.css'; 

// let Queue = require('../dataStructures/Queue');
let GraphNode = require('../dataStructures/GraphNode');
// let Graph = require('../dataStructures/Graph');
let bfs = require('../algorithms/bfs');
let dfs = require('../algorithms/dfs');
let aStar = require('../algorithms/aStar')
let copyObjects = require('../algorithms/copyObjects')
//let { copy2dArrayOfObjects } = require('../algorithms/bfs');

let START_NODE_ROW_TEST = 10;
let START_NODE_COL_TEST = 18;
let FINISH_NODE_ROW_TEST = 10//5//14//14//8//7;
let FINISH_NODE_COL_TEST = 49-18//37//32//18+5+3;

const numRows = 20;
const numCols = 50;

let start = true;
//let clickedStart = false;
//let clickedEnd = false;

class PathFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed: false,
            clickedStart: false,
            clickedFinish: false

        };
    }

    componentDidMount() {
        // create grid when component is first rendered
        const grid = this.createDefaultGrid();
        
        this.setState({
            grid: grid
        });
    }

    //when mouse button is pressed
    handleMouseDown(row, col){
        //if the start node is clicked
        if(row === START_NODE_ROW_TEST && col === START_NODE_COL_TEST){
            console.log("clicked Start node")

            const newGrid = this.getNewGridWithUpdatedStartNode(this.state.grid, row, col, START_NODE_ROW_TEST, START_NODE_COL_TEST)        
            this.setState({
                grid: newGrid,
                clickedStart: true
            })
            return
        }

        if(row === FINISH_NODE_ROW_TEST && col === FINISH_NODE_COL_TEST){
            console.log("clicked End node")

            const newGrid = this.getNewGridWithUpdatedFinishNode(this.state.grid, row, col, FINISH_NODE_ROW_TEST, FINISH_NODE_COL_TEST)        
            this.setState({
                grid: newGrid,
                clickedFinish: true
            })
            return
        }
        
        const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({
            grid: newGrid,
            mouseIsPressed: true
        })
        console.log(`pressed mouse button on node (${row},${col})`)
    }
//////////////////////////////////////////
    //when mouse is hovering
    handleMouseEnter(row, col){        
        
        //if the start button is clicked
        // if(row === START_NODE_ROW_TEST && col === START_NODE_COL_TEST){
        if(this.state.clickedStart){
            const newGrid = this.getNewGridWithUpdatedStartNode(this.state.grid, row, col, START_NODE_ROW_TEST, START_NODE_COL_TEST)
            this.setState({
                grid: newGrid,                
            })
            return
        }
        if(this.state.clickedFinish){
            const newGrid = this.getNewGridWithUpdatedFinishNode(this.state.grid, row, col, FINISH_NODE_ROW_TEST, FINISH_NODE_COL_TEST)
            this.setState({
                grid: newGrid,                
            })
            return
        }
        //if the mouse isnt pressed, do nothing
        if(!this.state.mouseIsPressed){
            console.log(`hovering over node ${row},${col}`)
            
            return
        };
        console.log(`hovering over node (${row},${col})`)
        let newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col)
        this.setState({
            grid: newGrid
        })

    }

    //when you release mouse button
    handleMouseUp(row, col){
        //once you release the mouse button, set mouseIsPressed to false
        console.log(`release mouse button on node (${row},${col})`)
        this.setState({
            mouseIsPressed: false,
            clickedStart: false,
            clickedFinish: false
        })
    }

    //visualizeBFS(startNode, endNode){
    visualizeBFS(){        

        const {grid} = this.state;

        const startNode = grid[START_NODE_ROW_TEST][START_NODE_COL_TEST];
        const finishNode = grid[FINISH_NODE_ROW_TEST][FINISH_NODE_COL_TEST];

        const visitedNodes = bfs(grid, startNode, finishNode, numRows, numCols);

        this.animate(visitedNodes);

    }

    visualizeDFS(){
        const {grid} = this.state;

        const startNode = grid[START_NODE_ROW_TEST][START_NODE_COL_TEST];
        const finishNode = grid[FINISH_NODE_ROW_TEST][FINISH_NODE_COL_TEST];

        let visitedNodes = dfs(grid, startNode, finishNode, numRows, numCols);        

        this.animate(visitedNodes);
    }

    visualizeAStar(){
        const {grid} = this.state;

        const startNode = grid[START_NODE_ROW_TEST][START_NODE_COL_TEST];
        const finishNode = grid[FINISH_NODE_ROW_TEST][FINISH_NODE_COL_TEST];

        let visitedNodes = aStar(grid, startNode, finishNode, numRows, numCols);

        this.animate(visitedNodes);
    }

    animate(visitedNodes){
        for(let index in visitedNodes){
            setTimeout(() => {
                if(!start){
                    return
                }

                const updatedGrid = copyObjects.copy2dArrayOfObjects(this.state.grid);
                const currentNode = visitedNodes[index]; 
                
                updatedGrid[currentNode.row][currentNode.col].visited = true; 
                
                this.setState({
                    grid: updatedGrid
                })
            }, 50 * index)
        }
    }

    render() {
        const {grid} = this.state;  
        
        let count = 0;        

        return (
            <>
            <button onClick={() => this.visualizeBFS()}>
                Visualize Breadth First Search Algorithm
            </button>
            <button onClick={() => this.visualizeDFS()}>
                Visualize Depth First Search Algorithm
            </button>
            <button onClick={() => this.visualizeAStar()}>
                Visualize A*
            </button>
            <div className="grid">
            {/* Map can have three parameters: value, index, array */}
                {grid.map( (row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {                                
                                // obtaing the current node and create a div for it
                                const {value, row, col, isStart, isFinish, visited, isWall} = node;
                                return (
                                    <Node 
                                        key={count++} 
                                        value={value}
                                        row={row}
                                        col={col}
                                        isStart={isStart}
                                        isFinish={isFinish}
                                        visited={visited}
                                        isWall={isWall}
                                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                        onMouseUp={(row, col) => this.handleMouseUp(row, col)}
                                    />
                                )
                            }) }                            
                        </div>
                    )
                })}                
            </div>
            </>
        )
    }

    createDefaultGrid(){
        const grid = [];
        for (let row = 0; row < numRows; row++){
            const currentRow = [];
            for(let col = 0; col < numCols; col++) {                
                const currentNode = new GraphNode("", row, col);                
                currentNode.isStart = row === START_NODE_ROW_TEST && col === START_NODE_COL_TEST;
                currentNode.isFinish = row === FINISH_NODE_ROW_TEST && col === FINISH_NODE_COL_TEST;
                
                currentRow.push(currentNode);
            }
            grid.push(currentRow);
            //! At this point, each index contains a graphNode
        }
        return grid;
    }

    getNewGridWithWallToggled(grid, row, col){
            const newGrid = copyObjects.copy2dArrayOfObjects(grid)
            const node = newGrid[row][col]
            const newNode = copyObjects.clone(node)
            newNode.isWall = true
            newGrid[row][col] = newNode
            return newGrid
    }

    getNewGridWithUpdatedStartNode(grid, row, col, oldRow, oldCol){
        const newGrid = copyObjects.copy2dArrayOfObjects(grid)        
        
        const oldStartNode = newGrid[oldRow][oldCol]
        const newStartNode = newGrid[row][col]

        const oldStartNodeCopy = copyObjects.clone(oldStartNode)
        const newStartNodeCopy = copyObjects.clone(newStartNode)

        START_NODE_ROW_TEST = row
        START_NODE_COL_TEST = col  

        oldStartNodeCopy.isStart = false
        newStartNodeCopy.isStart = true
        
        newGrid[oldRow][oldCol] = oldStartNodeCopy        
        newGrid[row][col] = newStartNodeCopy

        return newGrid
    }
    
    getNewGridWithUpdatedFinishNode(grid, row, col, oldRow, oldCol){
        const newGrid = copyObjects.copy2dArrayOfObjects(grid)        
        
        const oldFinishNode = newGrid[oldRow][oldCol]
        const newFinishNode = newGrid[row][col]

        const oldStartNodeCopy = copyObjects.clone(oldFinishNode)
        const newStartNodeCopy = copyObjects.clone(newFinishNode)

        FINISH_NODE_ROW_TEST = row
        FINISH_NODE_COL_TEST = col  

        oldStartNodeCopy.isFinish = false
        newStartNodeCopy.isFinish = true
        
        newGrid[oldRow][oldCol] = oldStartNodeCopy        
        newGrid[row][col] = newStartNodeCopy

        return newGrid
    }
}

export default PathFinder;

/**
 * NOTES:
 * 
 * TODO: When someone clicks a node, have a pop up that gives choice of setting start and end node
 * 
 * 
 * 
 */