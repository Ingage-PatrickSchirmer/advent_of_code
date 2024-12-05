const fs = require('fs');

// Function to calculate HASH value for a given string
function calculateHASH(str) {
    let currentValue = 0;
    for (let i = 0; i < str.length; i++) {
        const asciiCode = str.charCodeAt(i);
        currentValue += asciiCode;
        currentValue *= 17;
        currentValue %= 256;
    }
    return currentValue;
}

// Function to process each step in the initialization sequence
function processStep(step, boxes) {
    const label = step.match(/[a-z]+/)[0];
    const operation = step[label.length];
    const boxIndex = calculateHASH(label);
    const lenses = boxes[boxIndex] || [];

    if (operation === '-') {
        // Remove lens with the given label
        const lensIndex = lenses.findIndex(lens => lens.label === label);
        if (lensIndex > -1) {
            lenses.splice(lensIndex, 1);
        }
    } else if (operation === '=') {
        // Add or replace lens
        const focalLength = parseInt(step.slice(label.length + 1), 10);
        const existingLensIndex = lenses.findIndex(lens => lens.label === label);
        const lens = { label, focalLength };

        if (existingLensIndex > -1) {
            lenses[existingLensIndex] = lens;
        } else {
            lenses.push(lens);
        }
    }

    boxes[boxIndex] = lenses;
}

// Function to calculate the total focusing power
function calculateFocusingPower(boxes) {
    let totalPower = 0;

    for (let i = 0; i < boxes.length; i++) {
        const lenses = boxes[i] || [];
        for (let j = 0; j < lenses.length; j++) {
            const lens = lenses[j];
            totalPower += (i + 1) * (j + 1) * lens.focalLength;
        }
    }

    return totalPower;
}

// Function to process the input file
function processInitializationSequence(filename) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const steps = data.replace(/\n/g, '').split(',');
        const boxes = new Array(256);

        steps.forEach(step => {
            processStep(step, boxes);
        });

        const totalFocusingPower = calculateFocusingPower(boxes);
        console.log('The total focusing power is:', totalFocusingPower);
    });
}

// Run the process on the input file
processInitializationSequence('input.txt');
