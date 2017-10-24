let addEventsToButtons = () => {
  addDigitsListener();
  addOperationsListener();
}

let math = {
  '+': (x, y) => { return x + y },
  '-': (x, y) => { return x - y },
  '÷': (x, y) => { return x / y },
  '×': (x, y) => { return x * y },
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
      
      if (multiplicationCounter === 2) {
        if (elemText === "×" || elemText === '÷') {
          let numbersToEvaluate = tape.splice(-4, 3);
          let x = numbersToEvaluate[0];
          let y = numbersToEvaluate[2];
          let operator = numbersToEvaluate[1];
          let product = math[operator](x, y);
          tape.splice(-1, 0, product);
        } else if (elemText === '+' || elemText === '-') {
          // TODO
        }
      }
      responsePane.innerText = tape[tape.length - 2] || responsePane.innerText;
    })
  } // end for
}

let tape = []

document.addEventListener('DOMContentLoaded', addEventsToButtons());