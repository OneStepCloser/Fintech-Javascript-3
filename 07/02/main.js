const distance = 500;
const list = document.querySelector('.wrapper__clicks');
const button = document.querySelector('.wrapper__button');

function addItemToList() {
  const newItem = document.createElement('li');

  newItem.appendChild(document.createTextNode(new Date().toString()));
  list.appendChild(newItem);
}

function doubleClick(element, doubleClickHandler, timeDistance) {
  let waitForDouble = false;

  const handler = () => {
    if (waitForDouble) {
      doubleClickHandler();
      waitForDouble = false;
    } else {
      waitForDouble = true;
      setTimeout(() => { waitForDouble = false; }, timeDistance);
    }
  };

  element.addEventListener('click', handler);
}

doubleClick(button, addItemToList, distance);
