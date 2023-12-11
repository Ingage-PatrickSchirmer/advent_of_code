const fs = require('fs');
const fileName = "input.txt";

const file = fs.readFileSync(fileName, 'utf8');
const lines = file.split(/\r?\n/);
const nodeMap = {};
const moves = [];
const start = "AAA";
const goal = "ZZZ";
const sequence = lines[0];
const part2StartingNodes = []
for(let i = 2; i < lines.length; i++) {
    let nodeName = lines[i].substring(0,3);
    let leftNodeName = lines[i].substring(7,10);
    let rightNodeName = lines[i].substring(12,15);
    nodeMap[nodeName] = {
        name: nodeName,
        left: leftNodeName,
        right: rightNodeName,
    };
    if (nodeName.endsWith("A")) {
        part2StartingNodes.push(nodeName);
    }
}

let sequenceIndex = 0;
let goalFound = false;
moves.push(start);
let nodeName;
let leftName;
let rightName;

while(!goalFound) {
    nodeName = moves[moves.length - 1];
    leftName = nodeMap[nodeName].left;
    rightName = nodeMap[nodeName].right;

    if (nodeName == goal) {
        goalFound = true;
        break;
    }
    
    if (sequence[sequenceIndex] == "L") {
        moves.push(leftName);
    } else if (sequence[sequenceIndex] == "R") {
        moves.push(rightName);
    }

    if (sequenceIndex < sequence.length - 1) {
        sequenceIndex++;
    } else {
        sequenceIndex = 0;
    }
}

console.log(`Part 1 answer: ${moves.length - 1} moves`);
