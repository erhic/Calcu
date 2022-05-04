const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.keys');
keys.addEventListener('click', (event) => {
  // Access the clicked element
  const { target } = event;

  // Check if the clicked element is a button.
  // If not, exit from the function
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    console.log('operator', target.value);
    return;
  }

  if (target.classList.contains('decimal')) {
    console.log('decimal', target.value);
    return;
  }

  if (target.classList.contains('all-clear')) {
    console.log('clear', target.value);
    return;
  }

  console.log('digit', target.value);
});


function handleOperator(nextOperator) {
  // Destructure the properties on the calculator object
  const { firstOperand, displayValue, operator } = calculator
  // `parseFloat` converts the string contents of `displayValue`
  // to a floating-point number
  const inputValue = parseFloat(displayValue);

  // verify that `firstOperand` is null and that the `inputValue`
  // is not a `NaN` value
  if (firstOperand === null && !isNaN(inputValue)) {
    // Update the firstOperand property
    calculator.firstOperand = inputValue;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}





function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }

  console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;

  } else if (operator) {

    const result = calculate(firstOperand, inputValue, operator);



    calculator.displayValue = String(result);

    calculator.firstOperand = result;

  }


  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);


  if (operator && calculator.waitingForSecondOperand)  {

    calculator.operator = nextOperator;

    console.log(calculator);

    return;

  }


  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}



resetCalculator();
updateDisplay();

function inputDecimal(dot) {

  if (calculator.waitingForSecondOperand === true) {

  	calculator.displayValue = '0.'

    calculator.waitingForSecondOperand = false;

    return

  }


  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

keys.addEventListener('click', event => {
  const { target } = event;
  const { value } = target;
  if (!target.matches('button')) {
    return;
  }

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
      resetCalculator();
      break;
    default:
      // check if the key is an integer
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});

// calculator.displayValue = String(result);

// calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
