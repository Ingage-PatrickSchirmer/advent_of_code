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

// Function to process the input file and calculate the sum of HASH values
function processInitializationSequence(filename) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        // Remove newline characters and split the sequence into individual steps
        const steps = data.replace(/\n/g, '').split(',');
        let sum = 0;

        // Calculate the HASH value for each step and add it to the sum
        steps.forEach(step => {
            sum += calculateHASH(step);
        });

        console.log('The sum of the HASH values is:', sum);
    });
}

// Run the process on the input file
processInitializationSequence('input.txt');
