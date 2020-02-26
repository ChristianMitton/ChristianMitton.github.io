import React, { Component } from 'react';

import Node from './Node/Node';
import '../styles/style.css'; 

let GraphNode = require('../dataStructures/GraphNode');

let bfs = require('../algorithms/bfs');
let dfs = require('../algorithms/dfs');
let aStar = require('../algorithms/aStar');
let dijkstra = require('../algorithms/dijkstra');


let generateMaze = require('../algorithms/mazeGeneration');
let copyObjects = require('../algorithms/copyObjects');

let DEFAULT_START_NODE_ROW = 10;
let DEFAULT_START_NODE_COL = 18;
let DEFAULT_FINISH_NODE_ROW = 10;
let DEFAULT_FINISH_NODE_COL = 31;

const numRows = 20;
const numCols = 50;

let start = true;

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

    clearWalls(){
        const newGrid = this.createDefaultGrid();        

        this.setState({
            grid: newGrid
        })
    }

    //when mouse button is pressed
    handleMouseDown(row, col){
        //if the start node is clicked
        if(row === DEFAULT_START_NODE_ROW && col === DEFAULT_START_NODE_COL){
            console.log("clicked Start node")

            const newGrid = this.getNewGridWithUpdatedStartNode(this.state.grid, row, col, DEFAULT_START_NODE_ROW, DEFAULT_START_NODE_COL)        
            this.setState({
                grid: newGrid,
                clickedStart: true
            })
            return
        }

        if(row === DEFAULT_FINISH_NODE_ROW && col === DEFAULT_FINISH_NODE_COL){
            console.log("clicked End node")

            const newGrid = this.getNewGridWithUpdatedFinishNode(this.state.grid, row, col, DEFAULT_FINISH_NODE_ROW, DEFAULT_FINISH_NODE_COL)        
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
        // if(row === DEFAULT_START_NODE_ROW && col === DEFAULT_START_NODE_COL){
        if(this.state.clickedStart){
            const newGrid = this.getNewGridWithUpdatedStartNode(this.state.grid, row, col, DEFAULT_START_NODE_ROW, DEFAULT_START_NODE_COL)
            this.setState({
                grid: newGrid,                
            })
            return
        }
        if(this.state.clickedFinish){
            const newGrid = this.getNewGridWithUpdatedFinishNode(this.state.grid, row, col, DEFAULT_FINISH_NODE_ROW, DEFAULT_FINISH_NODE_COL)
            this.setState({
                grid: newGrid,                
            })
            return
        }
        //if the mouse isnt pressed, do nothing
        if(!this.state.mouseIsPressed){
            // console.log(`hovering over node ${row},${col}`)
            
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
        //console.log(`release mouse button on node (${row},${col})`)
        this.setState({
            mouseIsPressed: false,
            clickedStart: false,
            clickedFinish: false
        })
    }

    //visualizeBFS(startNode, endNode){
    visualizeBFS(){        

        const {grid} = this.state;

        const startNode = grid[DEFAULT_START_NODE_ROW][DEFAULT_START_NODE_COL];
        const finishNode = grid[DEFAULT_FINISH_NODE_ROW][DEFAULT_FINISH_NODE_COL];

        const visitedNodes = bfs(grid, startNode, finishNode, numRows, numCols);

        this.animate(visitedNodes);

    }

    visualizeDFS(){
        const {grid} = this.state;

        const startNode = grid[DEFAULT_START_NODE_ROW][DEFAULT_START_NODE_COL];
        const finishNode = grid[DEFAULT_FINISH_NODE_ROW][DEFAULT_FINISH_NODE_COL];

        let visitedNodes = dfs(grid, startNode, finishNode, numRows, numCols);        

        this.animate(visitedNodes);
    }

    visualizeAStar(){
        const {grid} = this.state;

        const startNode = grid[DEFAULT_START_NODE_ROW][DEFAULT_START_NODE_COL];
        const finishNode = grid[DEFAULT_FINISH_NODE_ROW][DEFAULT_FINISH_NODE_COL];

        let visitedNodes = aStar(grid, startNode, finishNode, numRows, numCols);

        this.animate(visitedNodes);
    }

    visualizeDijkstra(){
        const {grid} = this.state;

        const startNode = grid[DEFAULT_START_NODE_ROW][DEFAULT_START_NODE_COL];
        const finishNode = grid[DEFAULT_FINISH_NODE_ROW][DEFAULT_FINISH_NODE_COL];

        let visitedNodes = dijkstra(grid, startNode, finishNode, numRows, numCols);

        this.animate(visitedNodes);

    }

    createMaze(){
        const {grid} = this.state;

        let visitedNodes = generateMaze(grid, numRows, numCols)

        this.animateMaze(visitedNodes)
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

    animateMaze(visitedNodes){
        for(let index in visitedNodes){
            setTimeout(() => {
                if(!start){
                    return
                }

                const updatedGrid = copyObjects.copy2dArrayOfObjects(this.state.grid);
                const currentNode = visitedNodes[index]; 
                
                updatedGrid[currentNode.row][currentNode.col].isWall = true; 
                
                this.setState({
                    grid: updatedGrid
                })
            }, 35 * index)
        }
    }

    render() {
        const {grid} = this.state;  
        
        let count = 0;        

        return (
            <>
            <button onClick={() => this.createMaze()}>
                Create Maze
            </button>
            <button onClick={() => this.clearWalls()}>
                Clear Walls
            </button>
            <button onClick={() => this.visualizeBFS()}>
                Visualize Breadth First Search Algorithm
            </button>
            <button onClick={() => this.visualizeDFS()}>
                Visualize Depth First Search Algorithm
            </button>
            <button onClick={() => this.visualizeAStar()}>
                Visualize A*
            </button>            
            <button onClick={() => this.visualizeDijkstra()}>
                Visualize Dijkstra's
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
                currentNode.isStart = row === DEFAULT_START_NODE_ROW && col === DEFAULT_START_NODE_COL;
                currentNode.isFinish = row === DEFAULT_FINISH_NODE_ROW && col === DEFAULT_FINISH_NODE_COL;
                
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

        DEFAULT_START_NODE_ROW = row
        DEFAULT_START_NODE_COL = col  

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

        DEFAULT_FINISH_NODE_ROW = row
        DEFAULT_FINISH_NODE_COL = col  

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