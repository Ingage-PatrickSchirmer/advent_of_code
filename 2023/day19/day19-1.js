const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8")

//const parts = input.split(/\r?\n\s*\n/);
//const workflows = parts[0].split(/\r?\n/) 
//const products = parts[1].split(/\r?\n/)
const [workflows, products] = input.split(/\r?\n\s*\n/).map(part => part.split(/\r?\n/));

const workflowRules = {};
const acceptedProducts = [];
let answer = 0

workflows.forEach(processWorkflows);

const convertedProducts = convertToObjectArray(products);

// Evaluate each product
convertedProducts.forEach(evaluateProduct);


acceptedProducts.forEach(product => {
    const totalSum = Object.values(product).reduce((sum, value) => sum + value, 0);
    answer += totalSum;
})

console.log('Answer:', answer);




function convertToObjectArray(strings) {
    return strings.map(str => {
        // Replace '=' with ':' and add quotes around property names
        let jsonLike = str.replace(/(\w+)=/g, '"$1":');
        
        // Parse the modified string as JSON
        return JSON.parse(jsonLike);
    });
}



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


function evaluateProduct(product) {
    let currentWorkflow = 'in';

    while (currentWorkflow !== 'R' && currentWorkflow !== 'A') {
        const workflow = workflowRules[currentWorkflow];
        let ruleApplied = false;

        for (const rule of workflow.rules) {
            const { item, operator, value } = rule.condition;
            if (evaluateCondition(product[item], operator, value)) {
                currentWorkflow = rule.result;
                ruleApplied = true;
                break;
            }
        }

        if (!ruleApplied) {
            currentWorkflow = workflow.default;
        }

        if (currentWorkflow === 'A') {
            acceptedProducts.push(product);
        }
    }
}

function evaluateCondition(productValue, operator, value) {
    switch (operator) {
        case '<': return productValue < value;
        case '<=': return productValue <= value;
        case '>': return productValue > value;
        case '>=': return productValue >= value;
        default: throw new Error(`Unknown operator: ${operator}`);
    }
}


