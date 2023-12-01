const fs = require('fs');

function sumCalibrationValues(lines) {
    let sum = 0;
    lines.forEach(line => {
        const firstDigit = line.match(/\d/); // Matches the first digit
        const lastDigit = line.match(/\d(?![\d\S]*\d)/); // Matches the last digit

        if (firstDigit && lastDigit) {
            sum += parseInt(firstDigit[0] + lastDigit[0]);
        }
    });
    return sum;
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading the file", err);
        return;
    }
    const lines = data.split('\n');
    const result = sumCalibrationValues(lines);
    console.log(result);
});
