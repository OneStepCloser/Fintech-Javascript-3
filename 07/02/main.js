const distance = 500;
const list = document.querySelector('.wrapper__clicks');

function buttonClickHandler() {
  if (!buttonClickHandler.prevTime) {
    buttonClickHandler.prevTime = new Date();
    return;
  }

  const now = new Date();

  if (now - buttonClickHandler.prevTime <= distance) {
    const newItem = document.createElement('li');

    newItem.appendChild(document.createTextNode(now.toString()));
    list.appendChild(newItem);
    buttonClickHandler.prevTime = undefined;
  }
}

const button = document.querySelector('.wrapper__button');

button.addEventListener('click', buttonClickHandler);
