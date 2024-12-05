const fs = require('node:fs');
let answer = 0;

const rotate = matrix => {
    return matrix.map((row, i) =>
        row.map((val, j) => matrix[matrix.length - 1 - j][i])
    );
};


const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split("\r\n");
let grid = lines.map((line) => line.split(""));
const mem = new Map();
const res = [];
let maxcycles = 1000000000;
for (let cycles = 0; cycles < maxcycles; cycles++) {
    let iof = res.indexOf(JSON.stringify(grid))
    if (iof != -1) {
        console.log(iof, cycles);
        let z = ((maxcycles - iof) % (cycles - iof)) + iof;
        grid = JSON.parse(res[z]);
        break;
    }
    res.push(JSON.stringify(grid));
    for (let direction = 0; direction < 4; direction++) {
        grid = rotate(grid);
        for (let row = 0; row < grid.length; row++) {
            let key = grid[row].join("");
            if (mem.has(key)) {
                grid[row] = mem.get(key);
            }
            else {
                let empty = grid[row].length - 1;
                for (let col = empty; col >= 0; col--) {
                    let rock = grid[row][col];
                    switch (rock) {
                        case '.':
                            break;
                        case '#':
                            empty = col - 1; break;
                        case 'O':
                            if (col != empty) {
                                grid[row][empty] = 'O';
                                grid[row][col] = '.';
                            }
                            empty--;
                            break;
                    }
                }
                mem.set(key, grid[row]);
            }
        }
    }
}

for (let row = 0; row < grid.length; row++) {
    let score = grid.length - row;
    let count = grid[row].filter((cell) => cell == 'O').length;
    answer += (score * count);
}

console.log("The answer is:", answer);