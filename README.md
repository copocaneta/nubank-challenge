## Code Challenge: Ganho de Capital

### Overview

This project calculates the taxes for buy and sell operations of stocks based on the given business rules. The tax is computed as 20% on the profit made from the sell operations, with considerations for previous losses and specific conditions where no tax is applied according to test specifications sent to me by the recruiter

### Features

-   Handles buy and sell operations
-   Calculates the weighted average cost of stocks
-   Applies previous losses to future gains
-   Ensures no tax is applied for transactions under certain conditions

### Technical and Architectural Decisions

-   **Architecture**: The application is designed using a class-based structure to encapsulate the operations and tax calculations. This modular approach makes the code more maintainable and testable in my opinion
-   **Programming Language**: The project is implemented in JavaScript, which, again, in my opinion is suitable for both server-side and client-side applications. This doesn't mean I am not willing to code this in Clojure
-   **Frameworks/Libraries**: Jest was used for unit testing to ensure application logic is correct. No additional frameworks are used, as the built-in capabilities of Node.js were enough for this project

### Prerequisites

-   Node.js installed on your machine

### Installation

1. **Unzip the file:**

    ```sh
    unzip nubank-coding-challenge.zip
    ```

2. **Install dependencies:**

-   Since we do use Jest for testing it is necessary to install the dependency with this commmand:

    ```sh
    yarn install
    ```

-   `npm install` could also be used instead of yarn

### Compilation and Execution

-   **Compiling**: No compilation is needed as the project is written in JavaScript and again please ensure that Node.js is installed.

-   **Execution**: To run the project, use the following command:

    ```sh
    node main.js < input.txt
    ```

### Running Tests

-   To run the tests for this project, use the following command:

    ```sh
    yarn test
    ```

-   For testing and development, I used:

    ```sh
    yarn test:dev
    ```

-   For debugging, I used:

    ```sh
    yarn test:debug
    ```

-   `npm` could also be used, in this case the commands would be `npm run test` or `npm run test:dev` or `npm run test:debug`

### Generating Documentation

-   To generate the documentation from the JSDoc comments, use the following command:

    ```sh
    yarn generate-docs
    ```

-   The generated documentation will be available in the docs directory. Open `index.html` in a web browser to view the documentation.

### Usage

1. **Prepare your input file:**

Create an input file (`input.txt`, or any other name you prefer) with the operations data in JSON format:

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

-   **main.js**: This is the entry point of the application. It reads input, processes each array of operations, and outputs the taxes
-   **operations.js**: File containin the `Operations` class which manages the state of stock operations and calculates the taxes

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
[{"tax":0},{"tax":0},{"tax":0}]
[{"tax":0},{"tax":10000},{"tax":0}]
```

### Business Rules

1. Tax Rate: 20% on profit made from sell operations
1. Weighted Average Cost: calculate after each buy operation
1. Loss Deduction: Previous losses are applied for future gains
1. No Tax Conditions:

-   No tax is paid on buy operations
-   No tax is paid if if the total value of the sell operation is less then or equal to 20000
