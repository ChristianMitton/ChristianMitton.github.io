function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    let copy = new obj.constructor();
    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function copy2dArrayOfObjects(array){
    let result = []
    for(let row in array){
        let newRow = []
        for(let col in array[row]){
            let copiedObj = clone(array[row][col]);
            newRow.push(copiedObj);
        }
        result.push(newRow);
    }

    return result;
}


module.exports.copy2dArrayOfObjects = copy2dArrayOfObjects;
module.exports.clone = clone;