import { writeFileSync, unlinkSync } from "fs";
import { exec } from "child_process";

describe("Integration Tests", () => {
    test("Case #1", (done) => {
        const input =
            '[{"operation":"buy", "unit-cost":10.00, "quantity": 100},{"operation":"sell", "unit-cost":15.00, "quantity": 50},{"operation":"sell", "unit-cost":15.00, "quantity": 50}]';
        writeFileSync("input.txt", input);

        exec("node main.js < input.txt", (error, stdout, stderr) => {
            if (error) {
                done(error);
            }
            expect(stdout.trim()).toBe(
                '[{"tax":"0.00"},{"tax":"0.00"},{"tax":"0.00"}]'
            );
            unlinkSync("input.txt");
            done();
        });
    });

    test("Case #2", (done) => {
        const input =
            '[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":20.00, "quantity": 5000},{"operation":"sell", "unit-cost":5.00, "quantity": 5000}]';
        writeFileSync("input.txt", input);

        exec("node main.js < input.txt", (error, stdout, stderr) => {
            if (error) {
                done(error);
            }
            expect(stdout.trim()).toBe(
                '[{"tax":"0.00"},{"tax":"10000.00"},{"tax":"0.00"}]'
            );
            unlinkSync("input.txt");
            done();
        });
    });
    test("Case #1 + Case #2", (done) => {
        const input =
            '[{"operation":"buy", "unit-cost":10.00, "quantity": 100}{"operation":"sell", "unit-cost":15.00, "quantity": 50},{"operation":"sell", "unit-cost":15.00, "quantity": 50}][{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":20.00, "quantity": 5000},{"operation":"sell", "unit-cost":5.00, "quantity": 5000}]';
        writeFileSync("input.txt", input);

        exec("node main.js < input.txt", (error, stdout, stderr) => {
            if (error) {
                done(error);
            }
            expect(stdout.trim()).toBe(
                `[{"tax":"0.00"},{"tax":"0.00"},{"tax":"0.00"}]
[{"tax":"0.00"},{"tax":"10000.00"},{"tax":"0.00"}]`
            );
            unlinkSync("input.txt");
            done();
        });
    });
});
