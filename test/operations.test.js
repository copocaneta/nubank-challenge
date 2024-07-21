import { Operations } from "../operations";

describe("Operations Class", () => {
    let operationService;

    beforeEach(() => {
        operationService = new Operations();
    });

    test("should add a buy operation and calculate zero tax", () => {
        operationService.addOperation({
            operation: "buy",
            unitCost: 10.0,
            quantity: 100,
        });
        const taxes = operationService.getTaxes();
        expect(taxes).toEqual([{ tax: 0 }]);
    });

    test("should add a sell operation with value less than 20000 and calculate zero tax", () => {
        operationService.addOperation({
            operation: "buy",
            unitCost: 10.0,
            quantity: 100,
        });
        operationService.addOperation({
            operation: "sell",
            unitCost: 15.0,
            quantity: 50,
        });
        const taxes = operationService.getTaxes();
        expect(taxes).toEqual([{ tax: 0 }, { tax: 0 }]);
    });

    test("should add a sell operation with profit and calculate tax correctly", () => {
        operationService.addOperation({
            operation: "buy",
            unitCost: 10.0,
            quantity: 10000,
        });
        operationService.addOperation({
            operation: "sell",
            unitCost: 20.0,
            quantity: 5000,
        });
        const taxes = operationService.getTaxes();
        expect(taxes).toEqual([{ tax: 0 }, { tax: 10000 }]);
    });

    test("should handle losses correctly", () => {
        operationService.addOperation({
            operation: "buy",
            unitCost: 10.0,
            quantity: 10000,
        });
        operationService.addOperation({
            operation: "sell",
            unitCost: 20.0,
            quantity: 5000,
        });
        operationService.addOperation({
            operation: "sell",
            unitCost: 5.0,
            quantity: 5000,
        });
        const taxes = operationService.getTaxes();
        expect(taxes).toEqual([{ tax: 0 }, { tax: 10000 }, { tax: 0 }]);
    });

    test("should handle an empty operations", () => {
        const taxes = operationService.getTaxes();
        expect(taxes).toEqual([]);
    });

    test("should handle multiple buy operations and no sell", () => {
        operationService.addOperation({
            operation: "buy",
            unitCost: 10.0,
            quantity: 100,
        });
        operationService.addOperation({
            operation: "buy",
            unitCost: 20.0,
            quantity: 200,
        });
        const taxes = operationService.getTaxes();
        expect(taxes).toEqual([{ tax: 0 }, { tax: 0 }]);
    });

    test("should handle a sell operation eith no prior buy", () => {
        operationService.addOperation({
            operation: "sell",
            unitCost: 15.0,
            quantity: 50,
        });
        const taxes = operationService.getTaxes();
        expect(taxes).toEqual([{ tax: 0 }]);
    });

    test("should handle zero quantity operations", () => {
        operationService.addOperation({
            operation: "buy",
            unitCost: 10.0,
            quantity: 0,
        });
        operationService.addOperation({
            operation: "sell",
            unitCost: 15.0,
            quantity: 0,
        });
        const taxes = operationService.getTaxes();
        expect(taxes).toEqual([{ tax: 0 }, { tax: 0 }]);
    });
});
