import React, { Component } from 'react';

import Node from './Node/Node';
import '../styles/style.css'; 

// let Queue = require('../dataStructures/Queue');
let GraphNode = require('../dataStructures/GraphNode');
let Graph = require('../dataStructures/Graph');
let bfs = require('../algorithms/bfs');
let dfs = require('../algorithms/dfs');
let copyObjects = require('../algorithms/copyObjects')
//let { copy2dArrayOfObjects } = require('../algorithms/bfs');

const START_NODE_ROW_TEST = 10;
const START_NODE_COL_TEST = 15;
const FINISH_NODE_ROW_TEST = 10;
const FINISH_NODE_COL_TEST = 20;

const numRows = 20;
const numCols = 50;

let start = true;

class PathFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed: false
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
        const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({
            grid: newGrid,
            mouseIsPressed: true
        })
        console.log(`pressed mouse button on node (${row},${col})`)
    }

    //when mouse is hovering
    handleMouseEnter(row, col){
        //if the mouse isnt pressed, do nothing
        if(!this.state.mouseIsPressed) return;
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
            mouseIsPressed: false
        })
    }

    //visualizeBFS(startNode, endNode){
    visualizeBFS(){        

        const {grid} = this.state;

        //let graph = new Graph(numRows,numCols);

        const startNode = grid[START_NODE_ROW_TEST][START_NODE_COL_TEST];
        const finishNode = grid[FINISH_NODE_ROW_TEST][FINISH_NODE_COL_TEST];

        const visitedNodes = bfs(grid, startNode, finishNode, numRows, numCols);

        //for(let index in visitedNodes) console.log(visitedNodes[index])

        this.animateBfs(visitedNodes);

    }

    animateBfs(visitedNodes){
        for(let index in visitedNodes){                                
            setTimeout(() => {     
                if(!start){
                    return;
                }                
                
                const updatedGrid = copyObjects.copy2dArrayOfObjects(this.state.grid);
                const currentNode = visitedNodes[index]; 
                
                updatedGrid[currentNode.row][currentNode.col].visited = true; 
                
                this.setState({
                    grid: updatedGrid
                })
            }, 50 * index);
        }
    }

    visualizeDFS(){
        const {grid} = this.state;

        //let graph = new Graph(numRows,numCols);

        const startNode = grid[START_NODE_ROW_TEST][START_NODE_COL_TEST];
        const finishNode = grid[FINISH_NODE_ROW_TEST][FINISH_NODE_COL_TEST];

        console.log("-1")
        let visitedNodes = dfs(grid, startNode, finishNode, numRows, numCols);
        console.log("-2")
        //for(let index in visitedNodes) console.log(visitedNodes[index])

        this.animateDFS(visitedNodes);
    }

    animateDFS(visitedNodes){
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
}

export default PathFinder;