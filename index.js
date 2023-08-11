// Get references to the necessary elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousInput = '';
let currentOperator = '';

// Add event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener('click', () => handleButtonClick(button));
});

// Function to handle button clicks
function handleButtonClick(button) {
  const value = button.value;

  if (value === 'clear') {
    clearDisplay();
  } else if (value === 'sign') {
    toggleSign();
  } else if (value === 'percent') {
    calculatePercentage();
  } else if (value === '=') {
    calculateResult();
  } else if (value === '.') {
    addDecimal();
  } else if (value === 'backspace') {
    removeLastDigit();
  } else if (isOperator(value)) {
    handleOperator(value);
  } else {
    appendNumber(value);
  }
}

function clearDisplay() {
  currentInput = '';
  previousInput = '';
  currentOperator = '';
  updateDisplay();
}

function toggleSign() {
  currentInput = (parseFloat(currentInput) * -1).toString();
  updateDisplay();
}

function calculatePercentage() {
  currentInput = (parseFloat(currentInput) / 100).toString();
  updateDisplay();
}

function calculateResult() {
  if (previousInput && currentOperator) {
    const result = operate(
      parseFloat(previousInput),
      currentOperator,
      parseFloat(currentInput)
    );
    currentInput = result.toString();
    previousInput = '';
    currentOperator = '';
    updateDisplay();
  }
}

function addDecimal() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay();
  }
}

function removeLastDigit() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function isOperator(value) {
  return value === '+' || value === '-' || value === '*' || value === '/';
}

function handleOperator(operator) {
  if (currentOperator && previousInput) {
    calculateResult();
  }
  currentOperator = operator;
  previousInput = currentInput;
  currentInput = '';
}

function appendNumber(number) {
  if (currentInput === '0' || currentInput === '-0') {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function updateDisplay() {
  display.textContent = currentInput || '0';
}

function operate(a, operator, b) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return b;
  }
}
