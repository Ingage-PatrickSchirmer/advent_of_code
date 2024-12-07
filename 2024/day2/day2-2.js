const fs = require('fs');

const filePath = 'input.txt';
const input = fs.readFileSync(filePath, 'utf-8').trim();

let safeReports = 0;

function isMonotonicWithValidDifferences(numbers) {
    // Handle edge cases
    if (numbers.length < 2) {
        return false; // Single numbers or empty lines are invalid
    }

    // Determine the initial trend (increasing or decreasing)
    const isIncreasing = numbers[1] > numbers[0];
    const isDecreasing = numbers[1] < numbers[0];

    // Check if the sequence follows the trend and has valid differences
    for (let i = 1; i < numbers.length; i++) {
        const difference = Math.abs(numbers[i] - numbers[i - 1]);
        
        // Validate the difference
        if (difference < 1 || difference > 3) {
            return false; // Difference is out of range
        }

        // Validate the trend
        if (isIncreasing && numbers[i] < numbers[i - 1]) {
            return false; // Breaks increasing order
        }
        if (isDecreasing && numbers[i] > numbers[i - 1]) {
            return false; // Breaks decreasing order
        }
    }

    return true; // The line is monotonic and differences are valid
}

function canBeCorrectedWithDampener(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        // Create a copy of the array without the current number
        const modifiedNumbers = numbers.slice(0, i).concat(numbers.slice(i + 1));

        // Check if the modified array is monotonic with valid differences
        if (isMonotonicWithValidDifferences(modifiedNumbers)) {
            return true; // The line can be corrected by removing one number
        }
    }

    return false; // No single removal can make the line valid
}

// Process each line
input.split('\n').forEach(report => {     
    const trimmedReport = report.trim(); // Trim whitespace from each line

    if (trimmedReport) {
        const numbers = trimmedReport.split(/\s+/).map(Number);

        if (isMonotonicWithValidDifferences(numbers)) {
            // Line is already safe
            safeReports++;
        } else if (canBeCorrectedWithDampener(numbers)) {
            // Line can be made safe with the dampener
            safeReports++;
        }
    }
});

console.log(`The number of safe reports is: ${safeReports}`);
