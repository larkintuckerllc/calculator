let addEventsToButtons = () => {
  addDigitsListener();
}

let addDigitsListener = () => {
  let digitButtons = document.getElementsByClassName('digits');
  for (let elem of digitButtons) {
    elem.addEventListener('click', (e) => {
      let elemText = e.currentTarget.innerText;
      let responsePane = document.getElementById('response-pane');
      responsePane.innerText += elemText;
    });
  }
}

let tape = {
  'addition': 0,
  'subtraction': 0,
  'multiplication': 0,
  'division': 0,
  'answer': 0,
}

document.addEventListener('DOMContentLoaded', addEventsToButtons());