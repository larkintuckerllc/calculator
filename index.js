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

let addOperationsListener = () => { // consider removing = button from this and giving it its own listener
  let operationButtons = document.getElementsByClassName('operations');
  let responsePane = document.getElementById('response-pane');
  for (let elem of operationButtons) {
    elem.addEventListener('click', (e) => {
      debugger;
      tape.push(responsePane.innerText);
      responsePane.dataset.processed = true;
      // let elemName = e.currentTarget.name;
      // let elemValue = e.currentTarget.value;
      let elemText = e.currentTarget.innerText;
      tape.push(elemText);

      if (multiplicationCounter === 1) {
        if (elemText === "×" || elemText === '÷') {
          let numbersToEvaluate = tape.splice(-4, 3);
          let x = numbersToEvaluate[0];
          let y = numbersToEvaluate[2];
          let operator = numbersToEvaluate[1];
          let product = math[operator](x, y);
          tape.splice(-1, 0, product);
        }
      }

      if (elemText === "×" || elemText === '÷') {
        multiplicationCounter = multiplicationCounter * -1 + 1;
      } else if (elemText === '+' || elemText === '-') {
        additionCounter = additionCounter * -1 + 1;
      }

    })
  } // end for
}

let tape = []
let multiplicationCounter = 0;
let additionCounter = 0;

document.addEventListener('DOMContentLoaded', addEventsToButtons());