const fs = require('fs');

function isDigit(char) {
  return !isNaN(char) && char !== '.';
}

function parseGrid(data) {
  const lines = data.split('\n');
  const partNumbers = new Map();
  const gears = [];

  for (let rowIndex = 0; rowIndex < lines.length; rowIndex++) {
    const row = lines[rowIndex].split('');
    let currentNumber = '';
    let currentNumberStartCol = 0;

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const cell = row[colIndex];
      if (isDigit(cell)) {
        currentNumber += cell;
        if (currentNumber.length === 1) {
          currentNumberStartCol = colIndex;
        }
      } else {
        if (currentNumber !== '') {
          const number = parseInt(currentNumber);
          for (let i = 0; i < currentNumber.length; i++) {
            partNumbers.set(`${rowIndex},${currentNumberStartCol + i}`, number);
          }
          currentNumber = '';
        }
        if (cell === '*') {
          gears.push([rowIndex, colIndex]);
        }
      }
    }

    if (currentNumber !== '') {
      const number = parseInt(currentNumber);
      for (let i = 0; i < currentNumber.length; i++) {
        partNumbers.set(`${rowIndex},${currentNumberStartCol + i}`, number);
      }
    }
  }

  return { partNumbers, gears };
}

function getAdjacentPartNumbers(x, y, partNumbers) {
  const deltas = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
  const adjacentNumbers = new Set();

  deltas.forEach(function([dx, dy]) {
    const key = `${x + dx},${y + dy}`;
    if (partNumbers.has(key)) {
      adjacentNumbers.add(partNumbers.get(key));
    }
  });

  return Array.from(adjacentNumbers);
}

function calculateGearRatios(partNumbers, gears) {
  let total = 0;

  gears.forEach(function([x, y]) {
    const adjacentNumbers = getAdjacentPartNumbers(x, y, partNumbers);
    if (adjacentNumbers.length === 2) {
      const product = adjacentNumbers[0] * adjacentNumbers[1];
      total += product;
      console.log(`Gear at (${x}, ${y}) with numbers ${adjacentNumbers[0]} and ${adjacentNumbers[1]}, product: ${product}`);
    }
  });

  return total;
}

fs.readFile('input.txt', 'utf8', function(err, data) {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const { partNumbers, gears } = parseGrid(data);
  const result = calculateGearRatios(partNumbers, gears);
  console.log('Sum of all gear ratios:', result);
});
