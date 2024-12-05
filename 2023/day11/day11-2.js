const fs = require("fs")
const input = fs.readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let adjustedM = input;
for (let i = 0; i < adjustedM.length; i++) {
    if (adjustedM[i].indexOf("#") == -1) adjustedM.splice(++i, 0, new Array(adjustedM[i].length).fill("$").join(""));
}
for (let i = 0; i < adjustedM[0].length; i++) {
    if (!adjustedM.reduce((acc, cur) => acc || cur[i] == "#", false)) {
        for (let j = 0; j < adjustedM.length; j++) adjustedM[j] = adjustedM[j].slice(0, i + 1) + "$" + adjustedM[j].slice(i + 1);
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

console.log('The answer is', pairs.map(pair => {
    let [y1, x1] = pair[0], [y2, x2] = pair[1];
    let deltaY = 0, deltaX = 0, delta = 999999;

    while (y1 < y2) {
        if (adjustedM[y1][x1] == "$") deltaY += delta;
        else deltaY++;
        y1++;
    }
    while (y1 > y2) {
        if (adjustedM[y1][x1] == "$") deltaY += delta;
        else deltaY++;
        y1--;
    }

    while (x1 < x2) {
        if (adjustedM[y1][x1] == "$") deltaX += delta;
        else deltaX++;
        x1++;
    }
    while (x1 > x2) {
        if (adjustedM[y1][x1] == "$") deltaX += delta;
        else deltaX++;
        x1--;
    }

    return deltaX + deltaY;
}).reduce((acc, x) => acc + x) / 2);