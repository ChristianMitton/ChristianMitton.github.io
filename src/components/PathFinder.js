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
        for (let row = 0; row < 15; row++){
            const currentRow = [];
            for(let col = 0; col < 50; col++) {
                currentRow.push([]);
            }
            nodes.push(currentRow);
        }
        this.setState({
            nodes
        });
    }

    render() {
        const {nodes} = this.state;        

        return (
            <div className="grid">
                {nodes.map( (row, rowIdx) => {
                    return (
                        <div>
                            {row.map((node, nodeIdx) => <Node />)}
                        </div>
                    )
                })}                
            </div>
        )
    }

}

export default PathFinder;