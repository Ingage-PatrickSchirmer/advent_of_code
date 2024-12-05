const fs = require('fs');

function calculateTotalDistance(filePath) {
    // Read the file
    const input = fs.readFileSync(filePath, 'utf-8').trim();
    
    // Split into rows and then columns to form the two lists
    const leftList = [];
    const rightList = [];
    input.split('\n').forEach(line => {
        const [left, right] = line.split(/\s+/).map(Number);
        leftList.push(left);
        rightList.push(right);
    });

    // Sort both lists in ascending order
    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);

    // Calculate the total distance
    let totalDistance = 0;
    for (let i = 0; i < leftList.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i]);
    }

    return totalDistance;
}

// Path to the puzzle input file
const filePath = 'input.txt';
const totalDistance = calculateTotalDistance(filePath);

console.log(`The total distance between the two lists is: ${totalDistance}`);
