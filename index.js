(function app() {
  const tape = [];

  // TODO make AC functional, don't disable AC here, instruct user to press AC in validateNumber()
  const disableButtons = () => {
    const buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i += 1) {
      const button = buttons[i];
      button.disabled = true;
    }
  };

  const validationHelpers = {
    errors: ['Error', 'Undefined'],
    validateNumber: (number) => {
      if (number.toPrecision().length > 10) {
        disableButtons();
        return validationHelpers.errors[0];
      } else if (number === Infinity) {
        disableButtons();
        return validationHelpers.errors[1];
      }
      return number;
    },
    // on page load, dataset.processed is null. When user first presses a digits
    // button, responsePane will show the digit that was pressed, and then
    // dataset.processed becomes false. When the user presses an operations
    // button, dataset.processed becomes true so that the next digits button
    // press will display the digit instead of appending the digit to the
    // display.
    validateDigitsInput: (responsePane, elemText) => {
      let responsePaneText = responsePane.innerText;
      if (responsePane.dataset.processed === 'false') {
        responsePaneText += elemText;
        return responsePaneText;
      }
      return elemText;
    },
    validateOperationsInput: (responsePane) => {
      const operators = ['+', '-', '×', '÷', '='];
      if (responsePane.dataset.processed !== 'true') {
        tape.push(Number(responsePane.innerText));
      }
      // if user inputs 2 operators in a row, overwrite the first one
      if (operators.includes(tape[tape.length - 1])) {
        tape.pop();
      }
    },
    validateOutput: (responsePaneText) => {
      if (validationHelpers.errors.includes(tape[0])) {
        return tape[0];
      }
      // always display the last number in the tape to the user
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
    doMath: () => {
      const numbersToEvaluate = tape.splice(-4, 3);
      const x = numbersToEvaluate[0];
      const y = numbersToEvaluate[2];
      const operator = numbersToEvaluate[1];
      const answer = math[operator](x, y);
      tape.splice(-1, 0, answer);
    },
    evaluateTape: () => {
      const addition = ['+', '-'];
      const multiplication = ['×', '÷'];
      const firstOperator = tape[1];
      const secondOperator = tape[3];
      const thirdOperator = tape[5];
      // N is any number, m is division or multiplication, and a is addition or
      // subtraction. There are a total of 5 possible scenarios, as listed below.
      // This accounts for scenarios [N, m, N, m], [N, m, N, a], and [N, a, N, a]
      if (multiplication.includes(firstOperator) || addition.includes(secondOperator)) {
        math.doMath();
      }
      if (thirdOperator) {
        // This accounts for scenario [N, a, N, m, N, m]
        if (multiplication.includes(thirdOperator)) {
          math.doMath();
        }
        // This accounts for scenario [N, a, N, m, N, a]
        if (addition.includes(thirdOperator)) {
          math.doMath();
          math.doMath();
        }
      }
    },
  };

  const addDigitsListener = () => {
    const digitButtons = document.getElementById('digit-buttons');
    const responsePane = document.getElementById('response-pane');
    digitButtons.addEventListener('click', (e) => {
      const elemText = e.target.innerText;
      responsePane.innerText = validationHelpers.validateDigitsInput(responsePane, elemText);
      responsePane.dataset.processed = false;
    });
  };

  const addOperationsListener = () => {
    const responsePane = document.getElementById('response-pane');
    const operationButtons = document.getElementById('operation-buttons');
    operationButtons.addEventListener('click', (e) => {
      validationHelpers.validateOperationsInput(responsePane);
      responsePane.dataset.processed = true;
      tape.push(e.target.innerText);

      if (tape.length === 4 || tape.length === 6) {
        math.evaluateTape();
      }

      if (tape[tape.length - 1] === '=') {
        while (tape.length > 2) {
          math.doMath();
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
}());
