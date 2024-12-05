const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8")

const [workflows, products] = input.split(/\r?\n\s*\n/).map(part => part.split(/\r?\n/));

const workflowRules = {};


workflows.forEach(processWorkflows);
// console.log(workflowRules);
// console.log(JSON.stringify(workflowRules, null, 2));



function processWorkflows(workflowLine) {
    const regex = /^([a-zA-Z]+)\{([^}]*)\}/;
    const matches = workflowLine.match(regex);
    if (!matches) {
        console.error('Invalid workflow format:', workflowLine);
        return;
    }

    const [, name, values] = matches;
    const rulesStrings = values.split(/,/);
    const defaultRule = rulesStrings.pop().trim();

    const rules = rulesStrings.map(ruleString => {
        const [conditionString, result] = ruleString.split(/:/).map(part => part.trim());
        const conditionRegex = /(\w+)([<>]=?)(\d+)/;
        const conditionMatches = conditionString.match(conditionRegex);
        if (!conditionMatches) {
            console.error('Invalid condition format:', conditionString);
            return;
        }

        const [, item, operator, value] = conditionMatches;
        return { condition: { item, operator, value: parseInt(value, 10) }, result };
    });

    workflowRules[name] = { rules, default: defaultRule };
}


function parseWorkflows(workflows) {
    const ranges = { x: [], m: [], a: [], s: [] };

    workflows.forEach(workflow => {
        workflow.rules.forEach(rule => {
            if (rule.result === 'A') {
                const condition = rule.condition;
                const range = convertConditionToRange(condition);
                ranges[condition.item].push(range);
            }
        });
    });

    return ranges;
}

function convertConditionToRange(condition) {
    // Converts a condition to a range. Assumes exclusive conditions (e.g., '<' or '>').
    if (condition.operator === '<') {
        return { min: 1, max: condition.value - 1 };
    } else if (condition.operator === '>') {
        return { min: condition.value + 1, max: 4000 };
    }
}

function mergeRanges(ranges) {
    // Merge overlapping ranges for each attribute
    for (let attr in ranges) {
        ranges[attr] = combineRanges(ranges[attr]);
    }
    return ranges;
}

function combineRanges(ranges) {
    // Combines overlapping or adjacent ranges
    ranges.sort((a, b) => a.min - b.min);

    const combined = [];
    ranges.forEach(range => {
        if (combined.length === 0 || range.min > combined[combined.length - 1].max + 1) {
            combined.push(range);
        } else {
            combined[combined.length - 1].max = Math.max(combined[combined.length - 1].max, range.max);
        }
    });

    return combined;
}

function calculateAcceptedCombinations(ranges) {
    // Assuming each attribute range is independent
    let totalCombinations = 1;
    for (let attr in ranges) {
        let countForAttr = 0;
        ranges[attr].forEach(range => {
            countForAttr += range.max - range.min + 1;
        });
        totalCombinations *= countForAttr;
    }
    return totalCombinations;
}

const parsedRanges = parseWorkflows(Object.values(workflowRules));
const mergedRanges = mergeRanges(parsedRanges);
const totalCombinations = calculateAcceptedCombinations(mergedRanges);

console.log("Total Accepted Combinations:", totalCombinations);