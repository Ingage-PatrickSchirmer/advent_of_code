const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let adjustedM = input;
for (let i = 0; i < adjustedM.length; i++) {
    if (adjustedM[i].indexOf("#") == -1) adjustedM.splice(i, 0, adjustedM[i++]);
}
for (let i = 0; i < adjustedM[0].length; i++) {
    if (!adjustedM.reduce((acc, cur) => acc || cur[i] == "#", false)) {
        for (let j = 0; j < adjustedM.length; j++) adjustedM[j] = adjustedM[j].slice(0, i) + "." + adjustedM[j].slice(i);
        i++;
    }
}

let positions = [];
for (let i = 0; i < adjustedM.length; i++) {
    for (let j = 0; j < adjustedM[i].length; j++) {
        if (adjustedM[i][j] == "#") positions.push([i, j]);
    }
}
let pairs = [];
for (let i = 0; i < positions.length; i++) {
    for (let j = 0; j < positions.length; j++) {
        if (i != j) pairs.push([positions[i], positions[j]]);
    }
}

console.log('The answer is', pairs.map(pair => Math.abs(pair[0][0] - pair[1][0]) + Math.abs(pair[0][1] - pair[1][1])).reduce((acc, x) => acc + x) / 2);