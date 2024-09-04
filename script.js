// Calculation functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b !== 0) {
        return a / b;
    } else {
        return "Can't be divided by zero";
    }
}

function modulus(a, b) {
    if (b !== 0) {
        return a % b;
    } else {
        return "Can't divide by zero";
    }
}

// Function that evaluates and gives the result
function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        case "%":
            return modulus(num1, num2);
        default:
            return "Invalid operator";
    }
}

let displayValue = "";
let firstNumber = null;
let secondNumber = null;
let currentOperator = null;

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute("data-value");

        if (["+", "-", "*", "/", "%"].includes(value)) {
            if (currentOperator && displayValue !== "") {
                secondNumber = parseFloat(displayValue);
                const result = operate(currentOperator, firstNumber, secondNumber);
                display.textContent = `${firstNumber} ${currentOperator} ${secondNumber} = ${result}`;
                firstNumber = result;
                displayValue = "";
            } else {
                firstNumber = parseFloat(displayValue);
                displayValue = "";
            }
            currentOperator = value;
            display.textContent = `${firstNumber} ${currentOperator}`;
        } else {
            displayValue += value;
            display.textContent = currentOperator ? `${firstNumber} ${currentOperator} ${displayValue}` : displayValue;
        }
    });
});

const resultButton = document.querySelector('.btn-result');

resultButton.addEventListener('click', () => {
    if (currentOperator && firstNumber !== null) {
        secondNumber = parseFloat(displayValue);
        const result = operate(currentOperator, firstNumber, secondNumber);
        display.textContent = `${firstNumber} ${currentOperator} ${secondNumber} = ${result}`;
        displayValue = "";
        firstNumber = null;
        secondNumber = null;
        currentOperator = null;
    }
});

// Backspace functionality for the 'ac' button
const acButton = document.querySelector('.btn-ac');

acButton.addEventListener('click', () => {
    displayValue = displayValue.slice(0, -1);
    display.textContent = displayValue || "0"; // Display 0 if displayValue is empty
});
