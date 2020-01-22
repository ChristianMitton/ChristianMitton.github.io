let GraphNode = require('../dataStructures/GraphNode');

function dfs(node){
    
    let children = node.children();
    for(index in children){
        //do something with element
        dfs(children[index]);
    }
}

// const node = {
//     name: "chris",
//     age: 23
// }

// dfs(node);