import { writeFileSync, unlinkSync, write } from "fs";
import { exec } from "child_process";
import { stderr, stdout } from "process";
import { error } from "console";

describe("Integration Tests", () => {
    test("Case #1", (done) => {
        const input =
            '[{"operation":"buy", "unit-cost":10.00, "quantity": 100},{"operation":"sell", "unit-cost":15.00, "quantity": 50},{"operation":"sell", "unit-cost":15.00, "quantity": 50}]';
        writeFileSync("input.txt", input);

        exec("node main.js < input.txt", (error, stdout, stderr) => {
            if (error) {
                done(error);
            }
            expect(stdout.trim()).toBe('[{"tax":0},{"tax":0},{"tax":0}]');
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
            expect(stdout.trim()).toBe('[{"tax":0},{"tax":10000},{"tax":0}]');
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
                `[{"tax":0},{"tax":0},{"tax":0}]
[{"tax":0},{"tax":10000},{"tax":0}]`
            );
            unlinkSync("input.txt");
            done();
        });
    });
    test("Case #3", (done) => {
        const input =
            '[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":5.00, "quantity": 5000},{"operation":"sell", "unit-cost":20.00, "quantity": 3000}]';
        writeFileSync("input.txt", input);

        exec("node main.js < input.txt", (error, stdout, stderr) => {
            if (error) {
                done(error);
            }
            expect(stdout.trim()).toBe('[{"tax":0},{"tax":0},{"tax":1000}]');
            unlinkSync("input.txt");
            done();
        });
    });
    test("Case #4", (done) => {
        const input =
            '[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"buy", "unit-cost":25.00, "quantity": 5000},{"operation":"sell", "unit-cost":15.00, "quantity": 10000}]';
        writeFileSync("input.txt", input);
        exec("node main.js < input.txt", (error, stdout, stderr) => {
            if (error) {
                done(error);
            }
            expect(stdout.trim()).toBe('[{"tax":0},{"tax":0},{"tax":0}]');
            unlinkSync("input.txt");
            done();
        });
    });
    test("Case #5", (done) => {
        const input =
            '[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"buy", "unit-cost":25.00, "quantity": 5000},{"operation":"sell", "unit-cost":15.00, "quantity": 10000},{"operation":"sell", "unit-cost":25.00, "quantity": 5000}]';
        writeFileSync("input.txt", input);
        exec("node main.js < input.txt", (error, stdout, stderr) => {
            if (error) {
                done(error);
            }
            expect(stdout.trim()).toBe(
                '[{"tax":0},{"tax":0},{"tax":0},{"tax":10000}]'
            );
            unlinkSync("input.txt");
            done();
        });
    });
    test("Case #6", (done) => {
        const input =
            '[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":2.00, "quantity": 5000},{"operation":"sell", "unit-cost":20.00, "quantity": 2000},{"operation":"sell", "unit-cost":20.00, "quantity": 2000},{"operation":"sell", "unit-cost":25.00, "quantity": 1000}]';
        writeFileSync("input.txt", input);
        exec("node main.js < input.txt", (error, stdout, stderr) => {
            if (error) {
                done(error);
            }
            expect(stdout.trim()).toBe(
                '[{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":3000}]'
            );
            unlinkSync("input.txt");
            done();
        });
    });
    test("Case #7", (done) => {
        const input =
            '[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":2.00, "quantity": 5000},{"operation":"sell", "unit-cost":20.00, "quantity": 2000},{"operation":"sell", "unit-cost":20.00, "quantity": 2000},{"operation":"sell", "unit-cost":25.00, "quantity": 1000},{"operation":"buy", "unit-cost":20.00, "quantity": 10000},{"operation":"sell", "unit-cost":15.00, "quantity": 5000},{"operation":"sell", "unit-cost":30.00, "quantity": 4350},{"operation":"sell", "unit-cost":30.00, "quantity": 650}]';
        writeFileSync("input.txt", input);
        exec("node main.js < input.txt", (error, stdout, stderr) => {
            if (error) {
                done(error);
            }
            expect(stdout.trim()).toBe(
                '[{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":3000},{"tax":0},{"tax":0},{"tax":3700},{"tax":0}]'
            );
            unlinkSync("input.txt");
            done();
        });
    });
    test("Case #8", (done) => {
        const input =
            '[{"operation":"buy", "unit-cost":10.00, "quantity": 10000}, {"operation":"sell", "unit-cost":50.00, "quantity": 10000},{"operation":"buy", "unit-cost":20.00, "quantity": 10000},{"operation":"sell", "unit-cost":50.00, "quantity": 10000}]';
        writeFileSync("input.txt", input);
        exec("node main.js < input.txt", (error, stdout, stderr) => {
            if (error) {
                done(error);
            }
            expect(stdout.trim()).toBe(
                '[{"tax":0},{"tax":80000},{"tax":0},{"tax":60000}]'
            );
            unlinkSync("input.txt");
            done();
        });
    });
});
