const fs = require('node:fs');
let answer = 0;

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split("\r\n");
let grid = lines.map((line) => line.split(""));
for (let col = 0; col < grid[0].length; col++) {
    let empty = 0;
    for (let row = 0; row < grid.length; row++) {
        let rock = grid[row][col];
        switch (rock) {
            case '.':
                break;
            case '#':
                empty = row + 1; break;
            case 'O':
                if (row != empty) {
                    grid[empty][col] = 'O';
                    grid[row][col] = '.';
                }
                empty++;
                break;
        }
    }
}
for (let row = 0; row < grid.length; row++) {
    let score = grid.length - row;
    let count = grid[row].filter((cell) => cell == 'O').length;
    answer += (score * count);
}

console.log("The answer is:", answer);