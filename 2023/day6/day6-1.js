const fs = require('fs');


function readInputFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8').trim();
    const [timesLine, distancesLine] = content.split('\n');
    const times = timesLine.split(/\s+/).slice(1).map(Number); // Skip the first "Time:" part
    const distances = distancesLine.split(/\s+/).slice(1).map(Number); // Skip the first "Distance:" part
    return times.map((time, index) => ({ time, distance: distances[index] })).filter(race => race.time && race.distance);
}


function calculateWays(races) {
    return races.map(race => {
        let ways = 0;
        for (let holdTime = 1; holdTime < race.time; holdTime++) {
            const travelTime = race.time - holdTime;
            const travelDistance = holdTime * travelTime;
            if (travelDistance > race.distance) {
                ways++;
            }
        }
        console.log(`Race (Time: ${race.time}, Distance: ${race.distance}): ${ways} ways to win`);
        return ways;
    });
}


function main() {
    const races = readInputFile('input.txt');
    console.log(`Parsed Races: ${JSON.stringify(races)}`);
    const ways = calculateWays(races);
    console.log(`Ways to Win Each Race: ${ways.join(', ')}`);
    const result = ways.reduce((acc, val) => acc * val, 1);
    console.log('Total ways to win all races:', result);
}

main();
