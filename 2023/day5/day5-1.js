const fs = require('fs');


const parseInput = (inputText) => {
    const lines = inputText.split('\n');
    const seeds = lines[0].split(': ')[1].split(' ').map(Number);
    const maps = {};

    let currentMap = '';
    lines.slice(1).forEach(line => {
        if (line.includes('map:')) {
            currentMap = line.split(':')[0].trim();
            maps[currentMap] = [];
        } else if (line.trim()) {
            maps[currentMap].push(line.trim().split(' ').map(Number));
        }
    });

    return { seeds, maps };
};

const convertNumber = (number, map) => {
    if (!Array.isArray(map)) {
        console.error('Invalid map:', map);
        return number;
    }

    for (const [destStart, srcStart, length] of map) {
        if (number >= srcStart && number < srcStart + length) {
            return destStart + (number - srcStart);
        }
    }
    return number;
};

const findLowestLocationNumber = (seeds, maps) => {
    let lowestLocation = Number.MAX_SAFE_INTEGER;
    
    seeds.forEach(seed => {
        let number = seed;
        ['seed-to-soil map', 'soil-to-fertilizer map', 'fertilizer-to-water map', 'water-to-light map', 'light-to-temperature map', 'temperature-to-humidity map', 'humidity-to-location map'].forEach(mapType => {
            number = convertNumber(number, maps[mapType]);
        });
        lowestLocation = Math.min(lowestLocation, number);
    });

    return lowestLocation;
};


fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    const { seeds, maps } = parseInput(data);

    console.log('maps:', maps);

    const lowestLocation = findLowestLocationNumber(seeds, maps);
    console.log('Lowest location number:', lowestLocation);
});
