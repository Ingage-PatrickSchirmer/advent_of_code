const fs = require('fs');

const findMinimumCubes = (gameData) => {
    const sets = gameData.split('; ');
    let minCubes = { red: 0, green: 0, blue: 0 };

    sets.forEach(set => {
        const cubeCounts = set.match(/(\d+) red|(\d+) green|(\d+) blue/g);
        if (cubeCounts) {
            cubeCounts.forEach(count => {
                const [number, color] = count.split(' ');
                minCubes[color] = Math.max(minCubes[color], parseInt(number));
            });
        }
    });

    return minCubes;
};


const processInputFile = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    let totalPower = 0;

    for (const line of lines) {
        if (line) {
            const gameDataPart = line.split(': ')[1];
            const minCubes = findMinimumCubes(gameDataPart);
            const power = minCubes.red * minCubes.green * minCubes.blue;
            totalPower += power;
        }
    }

    return totalPower;
};


const result = processInputFile('input.txt');
console.log('Sum of powers:', result);
