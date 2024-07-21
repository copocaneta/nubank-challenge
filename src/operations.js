export class Operations {
    constructor() {
        /**
         * @type {Array<Object>}
         * @description Stores the stock transactions
         */
        this.stock = [];

        /**
         * @type {number}
         * @description Total quantity of stocks
         */
        this.totalQuantity = 0;

        /**
         * @type {number}
         * @description Weighted average cost of stocks
         */
        this.weightedAverageCost = 0;

        /**
         * @type {number}
         * @description Total losses from sell operations
         */
        this.totalLosses = 0;

        /**
         * @type {Array<Object>}
         * @description Stores the tax result for each operacion
         */
        this.taxes = [];
    }

    /**
     * adds a new operation (buy or sell) and calculates the taxes
     * @param {Object} operation - operation to be added
     * @param {string} operation.operation - type of operation ("buy" or "sell")
     * @param {number} operation.unitCost - unit cost of the stock
     * @param {number} operation.quantity - quantity of stocks
     */
    addOperation(operation) {
        if (operation.operation === "buy") {
            this.buy(operation.unitCost, operation.quantity);
            this.taxes.push({ tax: parseFloat((0).toFixed(2)) });
        } else if (operation.operation === "sell") {
            const tax = this.sell(operation.unitCost, operation.quantity);
            this.taxes.push({ tax: parseFloat(tax.toFixed(2)) });
        }
    }

    /**
     * processes a buy operation, updating the weighted average cost and total quantity of stocks
     * @param {number} unitCost - unit cost of the stock.
     * @param {number} quantity - quantity of stocks.
     */
    buy(unitCost, quantity) {
        this.updateWeightedAverageCost(unitCost, quantity);
        this.totalQuantity = this.totalQuantity + quantity;
    }

    /**
     * processed a sell operation, calculating the tax based on profit and updating total losses (if needed)
     * @param {number} unitCost - unit cost of the stock
     * @param {number} quantity - quantity of stocks
     * @returns {number} - calculated tax for the sell operation
     */
    sell(unitCost, quantity) {
        const sellValue = unitCost * quantity;
        const averageCost = this.weightedAverageCost;
        const profit = (unitCost - averageCost) * quantity;

        let tax = 0;

        if (profit > 0) {
            if (sellValue > 20000) {
                if (this.totalLosses > 0) {
                    if (profit <= this.totalLosses) {
                        this.totalLosses = this.totalLosses - profit;
                    } else {
                        const taxableProfit = profit - this.totalLosses;
                        this.totalLosses = 0;
                        tax = taxableProfit * 0.2;
                    }
                } else {
                    tax = profit * 0.2;
                }
            }
        } else {
            this.totalLosses = this.totalLosses + Math.abs(profit);
        }

        this.updateStock(quantity);
        return tax;
    }

    /**
     * updates the weighted average cost of stocks based on the new operations
     * @param {number} unitCost - unit cost of the stock
     * @param {number} quantity - quantity of stocks
     */
    updateWeightedAverageCost(unitCost, quantity) {
        const currentTotalCost = this.weightedAverageCost * this.totalQuantity;
        const newTotalCost = currentTotalCost + unitCost * quantity;
        this.weightedAverageCost =
            newTotalCost / (this.totalQuantity + quantity);
    }

    /**
     * updates the stock by reducing the sold quantity from the current stock
     * @param {number} quantity - quantity of stocks to be to be reduced
     */
    updateStock(quantity) {
        while (quantity > 0 && this.stock.length > 0) {
            const currentStock = this.stock[0];
            if (currentStock.quantity <= quantity) {
                quantity = quantity - currentStock.quantity;
                this.stock.shift();
            } else {
                currentStock.quantity = currentStock.quantity - quantity;
                quantity = 0;
            }
        }
        this.totalQuantity = this.totalQuantity - quantity;
    }

    /**
     * returns the calculated taxes for all operations
     * @returns {Array<Object>} list of tax results for each operations
     */
    getTaxes() {
        return this.taxes;
    }
}
