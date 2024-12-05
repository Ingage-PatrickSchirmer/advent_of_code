const fs = require('fs');
const path = require('path');

// let input = `px{a<2006:qkq,m>2090:A,rfg}
// pv{a>1716:R,A}
// lnx{m>1548:A,A}
// rfg{s<537:gd,x>2440:R,A}
// qs{s>3448:A,lnx}
// qkq{x<1416:A,crn}
// crn{x>2662:A,R}
// in{s<1351:px,qqz}
// qqz{s>2770:qs,m<1801:hdj,R}
// gd{a>3333:R,R}
// hdj{m>838:A,pv}

// {x=787,m=2655,a=1222,s=2876}
// {x=1679,m=44,a=2067,s=496}
// {x=2036,m=264,a=79,s=2244}
// {x=2461,m=1339,a=466,s=291}
// {x=2127,m=1623,a=2188,s=1013}`;

let rules = {};
let acceptedCounters = [];


const input = fs.readFileSync('input.txt', 'utf8');


function processPartRec(ruleKey, part) {
    if (ruleKey === 'A') {
        acceptedCounters.push(part);
        return;
    }
    if (ruleKey === 'R') {
        return;
    } else {
        for (let rule of rules[ruleKey]) {
            if (rule.length === 1) {
                let newRuleKey = rule[0];
                processPartRec(newRuleKey, part);
            } else {
                let [fieldKey, condition, amount, destination] = rule;
                let currentField = part[fieldKey];

                let lowerField = new Set(Array.from({ length: amount }, (_, i) => i + 1));
                let higherField = new Set(Array.from({ length: 4001 - amount }, (_, i) => i + amount));

                if (condition === '<') {
                    currentField = new Set([...currentField].filter(x => !higherField.has(x)));
                } else if (condition === '>') {
                    currentField = new Set([...currentField].filter(x => !lowerField.has(x)));
                }

                part[fieldKey] = currentField;

                let newPart = { ...part };
                newPart[fieldKey] = new Set([...currentField].filter(x => rule[1] === '<' ? higherField.has(x) : lowerField.has(x)));

                processPartRec(destination, newPart);
            }
        }
    }
}

function main() {
    let [ruleString, partsString] = input.split('\n\n');
    for (let line of ruleString.split('\n')) {
        let [key, ruleStr] = line.slice(0, -1).split('{');
        let rulesList = [];
        for (let rule of ruleStr.split(',')) {
            if (!rule.includes(':')) {
                rulesList.push([rule]);
            } else {
                let [ruleCond, destination] = rule.split(':');
                let field = ruleCond[0];
                let condition = ruleCond.substring(1, 2);
                let amount = parseInt(ruleCond.substring(2));
                rulesList.push([field, condition, amount, destination]);
            }
        }
        rules[key] = rulesList;
    }

    let part = {
        'x': new Set(Array.from({ length: 4000 }, (_, i) => i + 1)),
        'm': new Set(Array.from({ length: 4000 }, (_, i) => i + 1)),
        'a': new Set(Array.from({ length: 4000 }, (_, i) => i + 1)),
        's': new Set(Array.from({ length: 4000 }, (_, i) => i + 1))
    };

    processPartRec('in', part);

    let result = acceptedCounters.reduce((acc, part) => {
        return acc + Object.values(part).reduce((prod, field) => prod * field.size, 1);
    }, 0);

    console.log(result);
}

main();
