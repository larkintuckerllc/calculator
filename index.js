let addEventsToButtons = () => {
  addDigitsListener();
  addOperationsListener();
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
  let responsePane = document.getElementById('response-pane');
  for (let elem of operationButtons) {
    elem.addEventListener('click', (e) => {
      responsePane.dataset.processed = true;
      let elemValue = e.currentTarget.value;
      if (tape.answer === null) {
        tape.answer = Number(responsePane.innerText);
      } else {
        tape[elemValue] = Number(responsePane.innerText);
      } // end if
    })
  } // end for
}

let tape = {
  'addition': null,
  'subtraction': null,
  'multiplication': null,
  'division': null,
  'answer': null,
}

document.addEventListener('DOMContentLoaded', addEventsToButtons());