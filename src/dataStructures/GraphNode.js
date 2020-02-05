class GraphNode {
    constructor(value, row, col){
        this.value = value;
        this.row = row;
        this.col = col; 
        this.visited = false;
        this.isStart = false;
        this.isFinish = false;
        this.isWall = false;
    }
}

module.exports = GraphNode;