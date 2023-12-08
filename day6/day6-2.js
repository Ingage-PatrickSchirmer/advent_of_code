const fs = require('fs');


function readInputFilePartTwo(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8').trim();
    const [timesLine, distancesLine] = content.split('\n');
    
    const time = parseInt(timesLine.replace(/\D/g, ''), 10);
    const distance = parseInt(distancesLine.replace(/\D/g, ''), 10);
    return { time, distance };
}


function calculateWaysForOneRace({ time, distance }) {
    let ways = 0;
    for (let holdTime = 1; holdTime < time; holdTime++) {
        const travelTime = time - holdTime;
        const travelDistance = holdTime * travelTime;
        if (travelDistance > distance) {
            ways++;
        }
    }
    return ways;
}


function mainPartTwo() {
    const race = readInputFilePartTwo('input.txt');
    console.log(`Parsed Race: Time = ${race.time}, Distance = ${race.distance}`);
    const ways = calculateWaysForOneRace(race);
    console.log(`Ways to Win the Race: ${ways}`);
}

mainPartTwo();
