const fs = require('fs');


function evaluateHand(hand) {
    const counts = hand.split('').reduce((acc, card) => {
        acc[card] = (acc[card] || 0) + 1;
        return acc;
    }, {});

    const types = ['5 of a kind', '4 of a kind', 'Full house', '3 of a kind', 'Two pair', '1 pair', 'High card'];
    let type = types[6]; 

    if (Object.values(counts).includes(5)) {
        type = types[0]; 
    } else if (Object.values(counts).includes(4)) {
        type = types[1]; 
    } else if (Object.values(counts).includes(3)) {
        type = Object.values(counts).includes(2) ? types[2] : types[3]; // 'Full house' or '3 of a kind'
    } else if (Object.values(counts).filter(c => c === 2).length === 2) {
        type = types[4]; 
    } else if (Object.values(counts).includes(2)) {
        type = types[5]; 
    }

    console.log(`Hand: ${hand}, Type: ${type}`);
    return { hand, type };
}


function compareHands(hand1, hand2) {
    const typeOrder = ['High card', '1 pair', 'Two pair', '3 of a kind', 'Full house', '4 of a kind', '5 of a kind'];
    const cardOrder = "23456789TJQKA"; 

    if (hand1.type !== hand2.type) {
        return typeOrder.indexOf(hand1.type) - typeOrder.indexOf(hand2.type);
    }

    
    for (let i = 0; i < hand1.hand.length; i++) {
        if (hand1.hand[i] !== hand2.hand[i]) {
            return cardOrder.indexOf(hand1.hand[i]) - cardOrder.indexOf(hand2.hand[i]); // Corrected comparison
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
