const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading the file:", err);
        return;
    }
    const lines = data.split('\n');
    let totalPoints = 0;

    for (const line of lines) {
        if (line.trim() === '') continue;
        const [winningNumbers, yourNumbers] = line.split('|').map(part => part.trim().split(/\s+/).map(Number));
        let cardPoints = 0;
        let matches = 0;

        for (const num of yourNumbers) {
            if (winningNumbers.includes(num)) {
                matches++;
                cardPoints = matches === 1 ? 1 : cardPoints * 2;
            }
        }

        totalPoints += cardPoints;
    }

    console.log("Total points of the scratchcards:", totalPoints);
});
