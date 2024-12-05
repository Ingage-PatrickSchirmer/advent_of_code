const fs = require('fs');

function checkSymbol(character) {
    if (character === '.') {
        return false;
    } else if (!isNaN(parseInt(character))) {
        return false;
    } else {
        return true;
    }
}

function getNumbersFromString(inputString) {
    let allNumbers = [];
    for (let i = 0; i < inputString.length; i++) {
        let currentNum = '';
        for (let j = 0; j < inputString[i].length; j++) {
            let currentChar = inputString[i][j];
            if (!isNaN(parseInt(currentChar))) {
                currentNum += currentChar;
            } else {
                if (currentNum.length > 0) {
                    allNumbers.push({ number: parseInt(currentNum), row: i, col: j - currentNum.length });
                    currentNum = '';
                }
            }
        }
        if (currentNum !== '') {
            allNumbers.push({ number: parseInt(currentNum), row: i, col: inputString[i].length - currentNum.length });
        }
    }
    return allNumbers;
}

function checkIfNextToSymbol(inputString, numObj) {
    let nearbyPositions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    for (let i = 0; i < numObj.number.toString().length; i++) {
        for (let k = 0; k < nearbyPositions.length; k++) {
            let newRow = numObj.row + nearbyPositions[k][0];
            let newCol = numObj.col + nearbyPositions[k][1] + i;
            if (newRow >= 0 && newRow < inputString.length && newCol >= 0 && newCol < inputString[newRow].length) {
                if (checkSymbol(inputString[newRow][newCol])) {
                    return true;
                }
            }
        }
    }
    return false;
}

function calculateSum(inputString) {
    let allNumbers = getNumbersFromString(inputString);
    let totalSum = 0;
    for (let i = 0; i < allNumbers.length; i++) {
        if (checkIfNextToSymbol(inputString, allNumbers[i])) {
            totalSum += allNumbers[i].number;
        }
    }
    return totalSum;
}

fs.readFile('input.txt', 'utf8', function(error, data) {
    if (error) {
        console.log("Error when reading the file:", error);
        return;
    }
    let inputLines = data.split('\n').map(function(line) {
        return line.trim();
    });
    console.log("Total Sum of Part Numbers:", calculateSum(inputLines));
});
