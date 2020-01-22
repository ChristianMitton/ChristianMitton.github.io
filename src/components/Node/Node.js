import React, { Component } from 'react';

import './styles.css';

class Node extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        };
    }

    render() {
        const {isStart, isFinish} = this.props;
        //? assign class depending on value passed to prop
        const extraClassName = isStart 
        ? 'node-start' 
        : isFinish 
        ? 'node-finish'
        : "";

        return (
            //assigning multiple classNames to a Node
            <div className={`node ${extraClassName}`}>
                
            </div>
        )
    }
}

export default Node;
// export const DEFAULT_NODE = {
//     row: 0,
//     col: 0,
// };