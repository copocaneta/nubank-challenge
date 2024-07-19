import readline from "readline";
import { Operations } from "./operations.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

const operationService = new Operations();

let lines = [];

rl.on("line", (line) => {
    if (line.trim() === "") {
        rl.close();
    } else {
        lines.push(line.trim());
    }
});

rl.on("close", () => {
    const joinedLines = lines.join("");
    const regex = /\[.*?\]/g;
    const operationsList = joinedLines.match(regex);

    if (operationsList) {
        operationsList.forEach((operations) => {
            const operationService = new Operations();
            const operationRegex =
                /"operation":"(.*?)",\s*"unit-cost":(.*?),\s*"quantity":(.*?)\}/g;
            let match;
            while ((match = operationRegex.exec(operations)) !== null) {
                const data = {
                    operation: match[1],
                    unitCost: parseFloat(match[2]),
                    quantity: parseInt(match[3], 10),
                };
                operationService.addOperation(data);
            }
            const taxes = operationService.getTaxes();
            console.log(JSON.stringify(taxes));
        });
    }
});
