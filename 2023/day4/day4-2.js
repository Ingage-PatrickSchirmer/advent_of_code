const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading the file:", err);
        return;
    }

    const lines = data.trim().split('\n');
    let scratchcards = lines.map((line, index) => {
        const parts = line.split('|');
        return {
            index,
            winningNumbers: parts[0].trim().split(/\s+/).map(Number),
            yourNumbers: parts[1].trim().split(/\s+/).map(Number),
            copies: 1 
        };
    });

    let totalScratchcards = 0;
    let queue = [...scratchcards];

    while (queue.length > 0) {
        let card = queue.shift();
        totalScratchcards += card.copies;

        let matches = card.yourNumbers.filter(num => card.winningNumbers.includes(num)).length;
        for (let i = 1; i <= matches; i++) {
            let nextCardIndex = card.index + i;
            if (nextCardIndex < scratchcards.length) {
                scratchcards[nextCardIndex].copies += card.copies;
                if (!queue.includes(scratchcards[nextCardIndex])) {
                    queue.push(scratchcards[nextCardIndex]);
                }
            }
        }
    }

    console.log("Total number of scratchcards processed:", totalScratchcards);
});
