## Stock Operations Tax Calculator

### Overview

This project calculates the taxes for buy and sell operations of stocks based on the given business rules. The tax is computed as 20% on the profit made from the sell operations, with considerations for previous losses and specific conditions where no tax is applied.

### Features

- Handles buy and sell operations.
- Calculates the weighted average cost of stocks.
- Applies previous losses to future gains.
- Ensures no tax is applied for transactions under certain conditions.

### Prerequisites

- Node.js installed on your machine.

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/stock-operations-tax-calculator.git
   cd stock-operations-tax-calculator
   ```

2. **Install dependencies:**

   No additional dependencies are required for this project as it only uses the Node.js built-in `readline` module.

### Usage

1. **Prepare your input file:**

   Create an input file (e.g., `input.txt`) with the operations data in JSON format:

   ```json
   [{"operation":"buy", "unit-cost":10.00, "quantity": 100},
    {"operation":"sell", "unit-cost":15.00, "quantity": 50},
    {"operation":"sell", "unit-cost":15.00, "quantity": 50}]
   [{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":20.00, "quantity": 5000},
    {"operation":"sell", "unit-cost":5.00, "quantity": 5000}]
   ```

2. **Run the script:**

   Execute the script with the input file:

   ```sh
   node main.js < input.txt
   ```

### Project Structure

- **main.js**: Entry point of the application. It reads input, processes each array of operations, and outputs the taxes.
- **operations.js**: Contains the `Operations` class which manages the state of stock operations and calculates the taxes.

### Example

**Input:**

```json
[{"operation":"buy", "unit-cost":10.00, "quantity": 100},
 {"operation":"sell", "unit-cost":15.00, "quantity": 50},
 {"operation":"sell", "unit-cost":15.00, "quantity": 50}]
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
 {"operation":"sell", "unit-cost":20.00, "quantity": 5000},
 {"operation":"sell", "unit-cost":5.00, "quantity": 5000}]
```

**Command:**

```sh
node main.js < input.txt
```

**Output**

```json
[{"tax":"0.00"},{"tax":"0.00"},{"tax":"0.00"}]
[{"tax":"0.00"},{"tax":"10000.00"},{"tax":"0.00"}]
```

### Business Rules

1. Tax Rate: 20% on profit made from sell operations.
1. Weighted Average Cost: Recalculated after each buy operation.
1. Loss Deduction: Previous losses are applied to future gains.
1. No Tax Conditions:
   - No tax is paid on buy operations.
   - No tax is paid if the total value of the sell operation is less than or equal to 20000.
