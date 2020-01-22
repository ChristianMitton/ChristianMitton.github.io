let Queue = require('../dataStructures/Queue');

let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

queue.printQueue();

function bfs(node){
    let queue = new Queue();

    queue.enqueue(node);

    while(!queue.isEmpty()){
        let currentNode = queue.dequeue();
        //do something with currentNode
        let children = currentNode.children;
        for(index in children){
            queue.enqueue(children[index]);            
        }
    }
}