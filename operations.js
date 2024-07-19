export class Operations {
    constructor() {
        this.stock = [];
        this.totalQuantity = 0;
        this.weightedAverageCost = 0;
        this.totalLosses = 0;
        this.taxes = [];
    }

    addOperation(operation) {
        if (operation.operation === "buy") {
            this.buy(operation.unitCost, operation.quantity);
            this.taxes.push({ tax: "0.00" });
        } else if (operation.operation === "sell") {
            const tax = this.sell(operation.unitCost, operation.quantity);
            this.taxes.push({ tax: tax.toFixed(2) });
        }
    }

    buy(unitCost, quantity) {
        this.updateWeightedAverageCost(unitCost, quantity);
        this.totalQuantity += quantity;
    }

    sell(unitCost, quantity) {
        const sellValue = unitCost * quantity;
        const averageCost = this.weightedAverageCost;
        const profit = (unitCost - averageCost) * quantity;

        let tax = 0;

        if (profit > 0) {
            if (sellValue > 20000) {
                if (this.totalLosses > 0) {
                    if (profit <= this.totalLosses) {
                        this.totalLosses -= profit;
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
            this.totalLosses += Math.abs(profit);
        }

        this.updateStock(quantity);
        return tax;
    }

    updateWeightedAverageCost(unitCost, quantity) {
        const currentTotalCost = this.weightedAverageCost * this.totalQuantity;
        const newTotalCost = currentTotalCost + unitCost * quantity;
        this.weightedAverageCost =
            newTotalCost / (this.totalQuantity + quantity);
    }

    updateStock(quantity) {
        while (quantity > 0 && this.stock.length > 0) {
            const currentStock = this.stock[0];
            if (currentStock.quantity <= quantity) {
                quantity -= currentStock.quantity;
                this.stock.shift();
            } else {
                currentStock.quantity -= quantity;
                quantity = 0;
            }
        }
        this.totalQuantity -= quantity;
    }

    getTaxes() {
        return this.taxes;
    }
}
