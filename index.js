const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousInput = '';
let currentOperator = '';

// Add event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener('click', () => handleButtonClick(button));
});

document.addEventListener('keydown', handleKeyPress); // Add keyboard event listener

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

function handleKeyPress(event) {
  const key = event.key;
  const keyMappings = {
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
    '.': '.',
    Enter: '=',
    Escape: 'clear',
    Backspace: 'backspace',
  };

  const buttonValue = keyMappings[key];

  if (buttonValue !== undefined) {
    const button = Array.from(buttons).find((btn) => btn.value === buttonValue);

    if (button) {
      button.click();
    }
  }
}

function clearDisplay() {
  currentInput = '0';
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
  if (previousInput !== '' && currentOperator !== '') {
    const result = operate(
      parseFloat(previousInput),
      currentOperator,
      parseFloat(currentInput || '0') 
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
  const displayedValue = display.textContent;

  if (displayedValue.length > 1) {
    const truncatedValue = displayedValue.slice(0, -1);
    currentInput = truncatedValue;
  } else {
    currentInput = '0';
  }

  updateDisplay();
}

function isOperator(value) {
  return value === '+' || value === '-' || value === '*' || value === '/';
}

function handleOperator(operator) {
  if (currentInput !== '' && previousInput !== '') {
    calculateResult();
  }
  currentOperator = operator;
  previousInput = currentInput;
  currentInput = '';
}


function appendNumber(number) {
  if (currentInput === '0' || currentInput === '-0') {
    currentInput = number;
  } else if (currentInput.length < 7) {
    currentInput += number;
  }
  updateDisplay();
}

function updateDisplay() {
  const formattedInput = formatNumber(parseFloat(currentInput));
  display.textContent = formattedInput || '0';
}

function operate(a, operator, b) {
  let result;

  switch (operator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      result = a / b;
      break;
    default:
      result = b;
  }
  result = parseFloat(result.toFixed(7));
  const formattedResult = formatNumber(result);
  return formattedResult;
}

function formatNumber(number) {
  const precision = 12; // Set the desired precision

  if (Math.abs(number) >= 1e6) {
    const formatter = new Intl.NumberFormat(undefined, {
      maximumFractionDigits: 2,
    });
    return formatter.format(number);
  } else {
    // Round the number to the specified precision
    const roundedNumber = parseFloat(number.toFixed(precision));
    return roundedNumber.toString();
  }
}

