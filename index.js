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

let validateNumber = (number) => {
  if (number.toPrecision().length > 10) {
    disableButtons();
    return 'Overflow';
  } else if (number === Infinity) {
    disableButtons();
    return 'Error: can\'t divide by zero in this universe. To continue, reload the page.';
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

// use numObj.toPrecision().length to determine if number is > 10 digits and return 'overflow' if it is.

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

let containsMultiplication = elem => elem === '×' || elem === '÷';

let containsAddition = elem => elem === '+' || elem === '-';

let addOperationsListener = () => { // consider removing = button from this and giving it its own listener
  let operationButtons = document.getElementsByClassName('operations');
  let responsePane = document.getElementById('response-pane');
  for (let elem of operationButtons) {
    elem.addEventListener('click', (e) => {
      tape.push(Number(responsePane.innerText));
      responsePane.dataset.processed = true;

      let elemText = e.currentTarget.innerText;
      tape.push(elemText);
      let multiplicationCounter = tape.filter((operator) => operator === '×' || operator === '÷').length;
      let additionCounter = tape.filter((operator) => operator === "+" || operator === '-').length;
      // scenario: [N, m, N, m]
      if ((tape[1] === '×' || tape[1] === '÷') && (tape[3] === '×' || tape[3] === '÷')) {
        let numbersToEvaluate = tape.splice(-4, 3);
        let x = numbersToEvaluate[0];
        let y = numbersToEvaluate[2];
        let operator = numbersToEvaluate[1];
        let product = math[operator](x, y);
        tape.splice(-1, 0, product);
      }
      // scenario: [N, m, N, a]
      if ((tape[1] === '×' || tape[1] === '÷') && (tape[3] === '+' || tape[3] === '-')) {
        let numbersToEvaluate = tape.splice(-4, 3);
        let x = numbersToEvaluate[0];
        let y = numbersToEvaluate[2];
        let operator = numbersToEvaluate[1];
        let product = math[operator](x, y);
        tape.splice(-1, 0, product);
      }
      // scenario: [N, a, N, m, N, m]
      if ((tape[1] === '+' || tape[1] === '-') && (tape[3] === '×' || tape[3] === '÷') && (tape[5] === '×' || tape[5] === '÷')) {
        let numbersToEvaluate = tape.splice(-4, 3);
        let x = numbersToEvaluate[0];
        let y = numbersToEvaluate[2];
        let operator = numbersToEvaluate[1];
        let product = math[operator](x, y);
        tape.splice(-1, 0, product);
      }
      // scenario: [N, a, N, m, N, a]
      if ((tape[1] === '+' || tape[1] === '-') && (tape[3] === '×' || tape[3] === '÷') && (tape[5] === '+' || tape[5] === '-')) {
        let numbersToEvaluate = tape.splice(-4, 3);
        let x = numbersToEvaluate[0];
        let y = numbersToEvaluate[2];
        let operator = numbersToEvaluate[1];
        let product = math[operator](x, y);
        numbersToEvaluate = tape.splice(0, 2);
        x = numbersToEvaluate[0];
        operator = numbersToEvaluate[1];
        let sum = math[operator](x, product);
        tape.splice(-1, 0, sum);
      }

      // scenario: [N, a, N, a]
      if ((tape[1] === '+' || tape[1] === '-') && (tape[3] === '+' || tape[3] === '-')) {
        let numbersToEvaluate = tape.splice(-4, 3);
        let x = numbersToEvaluate[0];
        let y = numbersToEvaluate[2];
        let operator = numbersToEvaluate[1];
        let sum = math[operator](x, y);
        tape.splice(-1, 0, sum);
      }

      responsePane.innerText = tape[tape.length - 2] || responsePane.innerText;
    })
  } // end for
}

let tape = []

document.addEventListener('DOMContentLoaded', addEventsToButtons());