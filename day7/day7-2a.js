const fs = require('fs');


const cardValuesPart2 = {
    "A": 14, "K": 13, "Q": 12, "J": 1, "T": 10,
    "9": 9, "8": 8, "7": 7, "6": 6, "5": 5, "4": 4, "3": 3, "2": 2
};


const jokerHandStrength = [
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 2, 4, 5, 6, 5, 7, 7],
    [0, 4, 6, 3, 7, 5, 6, 7],
    [0, 6, 7, 3, 4, 5, 6, 7],
    [0, 7, 2, 3, 4, 5, 6, 7],
    [0, 7, 2, 3, 4, 5, 6, 7],
];


function evaluateHand(hand) {
    let counts = hand.split('').reduce((acc, card) => {
        acc[card] = (acc[card] || 0) + 1;
        return acc;
    }, {});

    let jokerCount = counts['J'] || 0;
    let types = ['5 of a kind', '4 of a kind', 'Full house', '3 of a kind', 'Two pair', '1 pair', 'High card'];
    let type = types[6]; // Default to 'High card'

    // Standard hand evaluation
    if (counts['A'] === 5 || counts['K'] === 5 || counts['Q'] === 5 || counts['T'] === 5 || counts['9'] === 5 || counts['8'] === 5 || counts['7'] === 5 || counts['6'] === 5 || counts['5'] === 5 || counts['4'] === 5 || counts['3'] === 5 || counts['2'] === 5) {
        type = types[0]; // '5 of a kind'
    } else if (Object.values(counts).includes(4)) {
        type = types[1]; // '4 of a kind'
    } else if (Object.values(counts).includes(3)) {
        type = Object.values(counts).includes(2) ? types[2] : types[3]; // 'Full house' or '3 of a kind'
    } else if (Object.values(counts).filter(c => c === 2).length === 2) {
        type = types[4]; // 'Two pair'
    } else if (Object.values(counts).includes(2)) {
        type = types[5]; // '1 pair'
    }

    
    let handStrength = types.indexOf(type);
    handStrength = jokerHandStrength[jokerCount][handStrength];

    console.log(`Hand: ${hand}, Type: ${type}, Strength: ${handStrength}`);
    return { hand, type, strength: handStrength };
}


function compareHands(hand1, hand2) {
    
    if (hand1.strength !== hand2.strength) {
        return hand1.strength - hand2.strength;
    }

    
    for (let i = 0; i < hand1.hand.length; i++) {
        if (cardValuesPart2[hand1.hand[i]] !== cardValuesPart2[hand2.hand[i]]) {
            return cardValuesPart2[hand1.hand[i]] - cardValuesPart2[hand2.hand[i]];
        }
    }

    return 0;
}


function processInputAndCalculateWinnings(filename) {
    const data = fs.readFileSync(filename, 'utf8').trim().split('\n');
    let hands = data.map(line => {
        const [hand, bid] = line.split(' ');
        return { originalHand: hand, hand: evaluateHand(hand), bid: parseInt(bid) };
    });

    console.log("Initial Hands and Bids:", hands);

    
    hands.sort((a, b) => compareHands(a.hand, b.hand));

    console.log("Sorted Hands:", hands);

    
    hands.forEach((hand, index) => {
        hand.rank = index + 1;
        hand.value = hand.bid * hand.rank;
        console.log(`Hand: ${hand.originalHand}, Rank: ${hand.rank}, Value: ${hand.value}`);
    });

    
    return hands.reduce((sum, hand) => sum + hand.value, 0);
}

try {
    const totalWinnings = processInputAndCalculateWinnings('input.txt');
    console.log(`Total winnings: ${totalWinnings}`);
} catch (error) {
    console.error('Error:', error);
}
