const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8')
const springche = new Map();


const lines = input.trim().split('\n');
let sum = 0;

for (let line of lines) {
    let [springs, groups] = line.split(' ');
    springs = Array(5).fill(springs).join('?');
    groups = Array(5).fill(groups).join(',');
    groups = groups.split(',').map(Number);

    sum += getPossibleCount(springs, groups);
}

console.log('The answer is', sum)


function getPossibleCount(springs, groups, prevSize = 0, mustOperational = false) {
    const cacheKey = JSON.stringify({ springs, groups, prevSize, mustOperational });
    if (springche.has(cacheKey)) {
        return springche.get(cacheKey);
    }

    if (springs === "") {
        if (groups.length) {
            if (groups.length === 1 && groups[0] === prevSize) {
                return 1;
            }
            return 0;
        } else {
            return prevSize === 0 ? 1 : 0;
        }
    }

    if (groups.length === 0) {
        return springs.includes("#") || prevSize > 0 ? 0 : 1;
    }

    let curr = springs[0];
    let rest = springs.slice(1);

    if (curr === "?") {
        let result = getPossibleCount("#" + rest, groups, prevSize, mustOperational) +
            getPossibleCount("." + rest, groups, prevSize, mustOperational);
        springche.set(cacheKey, result);
        return result;
    }

    if (curr === "#") {
        if (mustOperational) return 0;
        let currSize = prevSize + 1;
        if (currSize > groups[0]) return 0;
        if (currSize === groups[0]) {
            let result = getPossibleCount(rest, groups.slice(1), 0, true);
            springche.set(cacheKey, result);
            return result;
        }
        let result = getPossibleCount(rest, groups, currSize, false);
        springche.set(cacheKey, result);
        return result;
    }

    if (curr === ".") {
        if (mustOperational || prevSize === 0) {
            let result = getPossibleCount(rest, groups, 0, false);
            springche.set(cacheKey, result);
            return result;
        }
        if (prevSize !== groups[0]) return 0;
        let result = getPossibleCount(rest, groups.slice(1), 0, false);
        springche.set(cacheKey, result);
        return result;
    }

}