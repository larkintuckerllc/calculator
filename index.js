let addEventsToButtons = () => {
  addDigitsListener();
  addOperationsListener();
}

// TODO make AC functional, don't disable AC here, instruct user to press AC in validateNumber()
let disableButtons = () => {
  let buttons = document.getElementsByTagName('button');
  for (let button of buttons) {
    button.disabled = true;
  }
}

let errors = ['Error', 'Undefined'];

let validateNumber = (number) => {
  if (number.toPrecision().length > 10) {
    disableButtons();
    return errors[0];
  } else if (number === Infinity) {
    disableButtons();
    return errors[1];
  }
  return number;
}

let math = {
  '+': (x, y) => {
    let sum = x + y;
    return validateNumber(sum);
  },
  '-': (x, y) => {
    let sum = x - y
    return validateNumber(sum);
  },
  '÷': (x, y) => {
    let product = x / y;
    return validateNumber(product);
  },
  '×': (x, y) => {
    let product = x * y;
    return validateNumber(product);
  },
}

let evaluateNumbers = () => {
  let numbersToEvaluate = tape.splice(-4, 3);
  let x = numbersToEvaluate[0];
  let y = numbersToEvaluate[2];
  let operator = numbersToEvaluate[1];
  let answer = math[operator](x, y);
  if (errors.includes(answer)) {
    tape = [answer];
  } else {
    tape.splice(-1, 0, answer);
  }
}

let addDigitsListener = () => {
  let digitButtons = document.getElementsByClassName('digits');
  let responsePane = document.getElementById('response-pane');
  for (let elem of digitButtons) {
    elem.addEventListener('click', (e) => {
      let elemText = e.currentTarget.innerText;
      if (responsePane.dataset.processed === 'false') {
        responsePane.innerText += elemText;
      } else {
        responsePane.innerText = elemText;
      } // end if
      responsePane.dataset.processed = false;
    });
  } // end for
}

let addOperationsListener = () => {
  let operationButtons = document.getElementsByClassName('operations');
  let operators = ['+', '-', '×', '÷', '='];
  let addition = ['+', '-'];
  let multiplication = ['×', '÷'];
  let reversedTape = [];
  let responsePane = document.getElementById('response-pane');
  for (let elem of operationButtons) {
    elem.addEventListener('click', (e) => {
      if (responsePane.dataset.processed !== 'true') {
        tape.push(Number(responsePane.innerText));
      }
      if (operators.includes(tape[tape.length - 1])) {
        tape.pop();
      }
      responsePane.dataset.processed = true;
      tape.push(e.currentTarget.innerText);

      let firstOperator = tape[1];
      let secondOperator = tape[3];
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
        let thirdOperator = tape[5];
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

      if (errors.includes(tape[0])) {
        responsePane.innerText = tape[0];
      } else {
        reversedTape = tape.slice();
        reversedTape.reverse();
        responsePane.innerText = reversedTape.find( elem => typeof elem === 'number') || responsePane.innerText;
      }
    })
  }
}

let tape = []

document.addEventListener('DOMContentLoaded', addEventsToButtons());