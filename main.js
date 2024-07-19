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
    let match = null;
    const regex =
        /"operation":"(.*?)",\s*"unit-cost":(.*?),\s*"quantity":(.*?)\}/g;

    while ((match = regex.exec(line.trim())) !== null) {
        const data = {
            operation: match[1],
            unitCost: parseFloat(match[2]),
            quantity: parseInt(match[3], 10),
        };

        operationService.addOperation(data);
    }

    if (line.trim() === "") {
        rl.close();
    } else {
        lines.push(line);
    }
});

rl.on("close", () => {
    const taxes = operationService.getTaxes();
    console.log(JSON.stringify(taxes));
});
