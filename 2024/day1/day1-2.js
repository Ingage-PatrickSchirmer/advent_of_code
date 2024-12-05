const fs = require('fs');

function calculateSimilarityScore(filePath) {
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

    // Create a frequency map for the right list
    const rightFrequency = {};
    rightList.forEach(num => {
        rightFrequency[num] = (rightFrequency[num] || 0) + 1;
    });

    // Calculate the similarity score
    let similarityScore = 0;
    leftList.forEach(num => {
        if (rightFrequency[num]) {
            similarityScore += num * rightFrequency[num];
        }
    });

    return similarityScore;
}

// Path to the puzzle input file
const filePath = 'input.txt';
const similarityScore = calculateSimilarityScore(filePath);

console.log(`The similarity score is: ${similarityScore}`);
