const fs = require('fs');

function sumCalibrationValues(lines) {
    const numberWords = {
        "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, 
        "six": 6, "seven": 7, "eight": 8, "nine": 9
    };
    let totalSum = 0;

    lines.forEach(line => {
        let numberIndices = [];

        Object.keys(numberWords).forEach(word => {
            let index = line.indexOf(word);
            while (index !== -1) {
                numberIndices.push({ index, value: numberWords[word] });
                index = line.indexOf(word, index + 1);
            }
        });

        for (let i = 0; i < line.length; i++) {
            if (!isNaN(parseInt(line[i]))) {
                numberIndices.push({ index: i, value: parseInt(line[i]) });
            }
        }

        numberIndices.sort((a, b) => a.index - b.index);

        if (numberIndices.length > 0) {
            const firstNumber = numberIndices[0].value;
            const lastNumber = numberIndices[numberIndices.length - 1].value;
            const calibrationValue = parseInt(`${firstNumber}${lastNumber}`);
            totalSum += calibrationValue;
        }
    });

    return totalSum;
}

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split('\n').filter(line => line.trim() !== '');
console.log(`Total Sum: ${sumCalibrationValues(lines)}`);
