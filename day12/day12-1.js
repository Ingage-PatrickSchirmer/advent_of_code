const fs = require('fs');


const input = fs.readFileSync('input.txt', 'utf8')


let springs = [];
let numbers = [];

const lines = input.trim().split('\n');

lines.forEach(line => {
    springs.push(line.split(' ')[0].split(''));
    numbers.push(line.split(' ')[1].split(','));
});

function counter(spring) {
    let count = 0;
    let n = [];
    for (let i = 0; i < spring.length; i++) {
        if (spring[i] === '#') {
            count++;
        } else if (spring[i] === '.') {
            if (count > 0) n.push(count);
            count = 0;
        }
    }
    if (count > 0) n.push(count);
    return n;
}

function generateCombinations(arr, index, result) {
    if (index === arr.length) {
        result.push([...arr]);
        return;
    }
    if (arr[index] === '?') {
        arr[index] = '.';
        generateCombinations([...arr], index + 1, result);
        arr[index] = '#';
        generateCombinations([...arr], index + 1, result);
        arr[index] = '?';
    } else {
        generateCombinations(arr, index + 1, result);
    }
}

function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (parseInt(arr1[i]) !== parseInt(arr2[i])) {
            return false;
        }
    }
    return true;
}

let sum = 0;
springs.forEach((spring, i) => {
    let c = 0;
    let resultArray = [];
    generateCombinations(spring, 0, resultArray);
    resultArray.forEach(arr => {
        if (areArraysEqual(counter(arr), numbers[i])) {
            c++;
        }
    });
    sum += c;
});

console.log('The answer is', sum);

