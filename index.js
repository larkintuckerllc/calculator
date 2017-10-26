let tape = [];

// TODO make AC functional, don't disable AC here, instruct user to press AC in validateNumber()
const disableButtons = () => {
  const buttons = document.getElementsByTagName('button');
  for (const button of buttons) {
    button.disabled = true;
  }
};

const errors = ['Error', 'Undefined'];

const validationHelpers = {
  validateNumber: (number) => {
    if (number.toPrecision().length > 10) {
      disableButtons();
      return errors[0];
    } else if (number === Infinity) {
      disableButtons();
      return errors[1];
    }
    return number;
  },
  validateInput: (responsePane, operators) => {
    if (responsePane.dataset.processed !== 'true') {
      tape.push(Number(responsePane.innerText));
    }
    if (operators.includes(tape[tape.length - 1])) {
      tape.pop();
    }
  },
  validateOutput: (responsePaneText) => {
    if (errors.includes(tape[0])) {
      return tape[0];
    }
    for (let i = tape.length; i >= 0; i -= 1) {
      if (typeof tape[i] === 'number') {
        return tape[i];
      }
    }
    return responsePaneText;
  },
};

const math = {
  '+': (x, y) => {
    const sum = x + y;
    return validationHelpers.validateNumber(sum);
  },
  '-': (x, y) => {
    const sum = x - y;
    return validationHelpers.validateNumber(sum);
  },
  '÷': (x, y) => {
    const product = x / y;
    return validationHelpers.validateNumber(product);
  },
  '×': (x, y) => {
    const product = x * y;
    return validationHelpers.validateNumber(product);
  },
};

const evaluateNumbers = () => {
  const numbersToEvaluate = tape.splice(-4, 3);
  const x = numbersToEvaluate[0];
  const y = numbersToEvaluate[2];
  const operator = numbersToEvaluate[1];
  const answer = math[operator](x, y);
  if (errors.includes(answer)) {
    tape = [answer];
  } else {
    tape.splice(-1, 0, answer);
  }
};

const addDigitsListener = () => {
  const digitButtons = document.getElementById('digit-buttons');
  const responsePane = document.getElementById('response-pane');
  digitButtons.addEventListener('click', (e) => {
    const elemText = e.target.innerText;
    if (responsePane.dataset.processed === 'false') {
      responsePane.innerText += elemText;
    } else {
      responsePane.innerText = elemText;
    } // end if
    responsePane.dataset.processed = false;
  });
}; // end for

const addOperationsListener = () => {
  const responsePane = document.getElementById('response-pane');
  const operators = ['+', '-', '×', '÷', '='];
  const operationButtons = document.getElementById('operation-buttons');
  const addition = ['+', '-'];
  const multiplication = ['×', '÷'];
  operationButtons.addEventListener('click', (e) => {
    validationHelpers.validateInput(responsePane, operators);
    responsePane.dataset.processed = true;
    tape.push(e.target.innerText);

    const firstOperator = tape[1];
    const secondOperator = tape[3];
    // scenario: [N, m, N, m]
    // scenario: [N, m, N, a]
    // scenario: [N, a, N, a]
    if (tape.length === 4) {
      if (multiplication.includes(firstOperator) || addition.includes(secondOperator)) {
        evaluateNumbers();
      }
    }
    if (tape.length === 6) {
      // scenario: [N, a, N, m, N, m]
      const thirdOperator = tape[5];
      if (multiplication.includes(thirdOperator)) {
        evaluateNumbers();
      }
      // scenario: [N, a, N, m, N, a]
      if (addition.includes(thirdOperator)) {
        evaluateNumbers();
        evaluateNumbers();
      }
    }

    if (tape[tape.length - 1] === '=') {
      while (tape.length > 2) {
        evaluateNumbers();
      }
      tape.pop();
    }

    responsePane.innerText = validationHelpers.validateOutput(responsePane.innerText);
  });
};

const addEventsToButtons = () => {
  addDigitsListener();
  addOperationsListener();
};

document.addEventListener('DOMContentLoaded', addEventsToButtons());
