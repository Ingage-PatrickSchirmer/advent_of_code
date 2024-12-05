const fs = require('fs');

function readInputFile(filePath) {
    return fs.readFileSync(filePath, 'utf8').split('\n').filter(line => line.trim());
}

function generateDifferences(sequence) {
    let differences = [];
    for (let i = 1; i < sequence.length; i++) {
        differences.push(sequence[i] - sequence[i - 1]);
    }
    return differences;
}

function extrapolateNextValue(history) {
    let sequences = [history];
    while (!sequences[sequences.length - 1].every(val => val === 0)) {
        sequences.push(generateDifferences(sequences[sequences.length - 1]));
    }
    let lastValue = sequences[0][sequences[0].length - 1];
    for (let i = 1; i < sequences.length; i++) {
        lastValue += sequences[i][sequences[i].length - 1];
    }
    return lastValue;
}

function processHistories(histories) {
    return histories.map(history => {
        let values = history.split(' ').map(Number);
        return extrapolateNextValue(values);
    });
}

function main() {
    const filePath = 'input.txt';
    const histories = readInputFile(filePath);
    const extrapolatedValues = processHistories(histories);
    const sum = extrapolatedValues.reduce((a, b) => a + b, 0);
    console.log(`The sum of extrapolated values is: ${sum}`);
}

main();
