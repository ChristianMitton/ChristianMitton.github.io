import React, { Component } from 'react';

import Node from './Node/Node';
import '../styles/style.css'; 

class PathFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: []
        };
    }

    componentDidMount() {
        // create array when component is first rendered
        const nodes = [];
        for (let row = 0; row < 20; row++){
            const currentRow = [];
            for(let col = 0; col < 50; col++) {
                const currentNode = {
                    //? passing in value of row and col to current node
                    row,
                    col,
                    isStart: row === 10 && col === 5,
                    isFinish: row === 10 && col === 45,
                };                
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
            //! At this point, each index contains a node with values corresponding to it's unique row and column
        }
        this.setState({
            nodes
        });
    }

    render() {
        const {nodes} = this.state;  
        
        let count = 0;        

        return (
            <div className="grid">
                {nodes.map( (row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                //{console.log("Count: " + count)}
                                const {isStart, isFinish} = node;
                                return (
                                    <Node 
                                        key={count++} 
                                        isStart={isStart}
                                        isFinish={isFinish}
                                    />
                                )
                            }) }                            
                        </div>
                    )
                })}                
            </div>
        )
    }

}

export default PathFinder;