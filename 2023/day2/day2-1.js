const fs = require('fs');

const processInputFile = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8').trim().split('\n');
    let totalPower = 0;

    data.forEach(line => {
        const gameDataPart = line.split(': ')[1];
        const sets = gameDataPart.split('; ');
        let minCubes = { red: 0, green: 0, blue: 0 };

        sets.forEach(set => {
            (set.match(/\d+ (red|green|blue)/g) || []).forEach(count => {
                const [number, color] = count.split(' ');
                minCubes[color] = Math.max(minCubes[color], parseInt(number));
            });
        });

        totalPower += minCubes.red * minCubes.green * minCubes.blue;
    });

    return totalPower;
};

const result = processInputFile('input.txt');
console.log('Sum of powers:', result);
