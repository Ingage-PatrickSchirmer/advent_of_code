const fs = require('fs');

function parseInput() {
    const data = fs.readFileSync('input.txt', 'utf8');
    let lines = data.split('\n').map(line => line.trim());

    const seeds = lines.shift().split(': ')[1].split(' ').map(Number);
    lines.shift();
    const maps = [];
    let current = [];

    lines.forEach(line => {
        if (line.endsWith('map:')) {
            current = [];
        } else if (line === '') {
            maps.push(current);
        } else {
            current.push(line.split(' ').map(Number));
        }
    });
    maps.push(current);

    return { seeds, maps };
}

function pairwise(array) {
    const result = [];
    for (let i = 0; i < array.length; i += 2) {
        result.push([array[i], array[i + 1]]);
    }
    return result;
}

function getLowNumber(seeds, maps) {
    function mapRange(seedRange, mapList) {
        let result = [];
        let [seedStart, seedLen] = seedRange;
        mapList.sort((a, b) => a[1] - b[1]).forEach(([dest, source, rangeLen]) => {
            let offset = dest - source;
            if (seedStart >= source && seedStart < source + rangeLen) {
                let resStart = seedStart + offset;
                if (source + rangeLen >= seedStart + seedLen) {
                    result.push([resStart, seedLen]);
                } else {
                    let newSeedLen = seedStart + seedLen - source - rangeLen;
                    result.push([resStart, seedLen - newSeedLen]);
                    seedLen = newSeedLen;
                    seedStart = source + rangeLen;
                }
            }
        });
        if (!result.length) {
            result.push(seedRange);
        }
        return result;
    }

    const myList = [];
    for (let sp of pairwise(seeds)) {
        let seedRanges = [sp];
        for (let m of maps) {
            let newSeedRanges = [];
            for (let s of seedRanges) {
                newSeedRanges.push(...mapRange(s, m));
            }
            seedRanges = newSeedRanges;
        }
        myList.push(Math.min(...seedRanges.map(x => x[0])));
    }
    console.log(Math.min(...myList));
}

const { seeds, maps } = parseInput();

getLowNumber([...seeds], [...maps]);
