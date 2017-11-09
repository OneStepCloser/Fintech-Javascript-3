const digitRegexp = new RegExp('[0-9]');

function getDigitSequence(charSequence) {
  const subLines = charSequence.split('');
  let result = '';

  for (let i = 0; i < subLines.length; ++i) {
    if (digitRegexp.test(subLines[i])) {
      result += (i === 1 && subLines[i] !== '7') ? '7' : subLines[i];
    }
  }

  return result;
}

function getMaskedNumber(digitSequence) {
  const subLines = digitSequence.split('');

  let result = '';

  const min = digitSequence.length < 11 ? digitSequence.length : 11;

  for (let i = 0; i < min; ++i) {
    if (i === 0) { result += '+'; }
    if (i === 1) { result += '('; }
    if (i === 4) { result += ')-'; }
    if (i === 7 || i === 9) { result += '-'; }
    result += subLines[i];
  }

  return result;
}

function setCaretOnDelete(input, prevPos) {
  if (prevPos < 0) { return; }
  let targetPos = prevPos + 1;

  if (prevPos === 7) { targetPos = prevPos - 1; }
  if (prevPos === 11 || prevPos === 14) { targetPos = prevPos; }
  if (prevPos < 3) { targetPos = 3; }
  input.setSelectionRange(targetPos, targetPos);
}

function setCaretOnAdd(input, prevPos) {
  if (prevPos < 0) { return; }
  let targetPos = prevPos + 1;

  if (prevPos === 6) { targetPos = prevPos + 3; }
  if (prevPos === 11 || prevPos === 14) { targetPos = prevPos + 2; }
  if (prevPos < 3) { targetPos = 3; }
  input.setSelectionRange(targetPos, targetPos);
}

function remainCaretTheSame(input, prevPos) {
  let targetPos = prevPos;

  if (prevPos < 0) { targetPos = 16; }
  if (prevPos === 7) { targetPos = prevPos + 1; }
  if (0 < prevPos && prevPos < 3) { targetPos = 3; }
  input.setSelectionRange(targetPos, targetPos);
}

function getCursorPos(input, val) {
  return val.slice(0, input.selectionStart).length - 1;
}

function refreshInput(val, cursorPos, returnCaret) {
  const input = document.getElementById('wrapper__phone');

  input.value = getMaskedNumber(getDigitSequence(val));

  if (telChangeHandler.prevLength > input.value.length) {
    setCaretOnDelete(input, cursorPos);
  } else if (telChangeHandler.prevLength <= input.value.length) {
    setCaretOnAdd(input, cursorPos);
  }
  if (returnCaret) {
    remainCaretTheSame(input, cursorPos);
  }
}

function refreshLink() {
  const input = document.getElementById('wrapper__phone');
  const link = document.getElementById('link');

  link.text = `Позвонить на ${input.value}`;
  link.href = `tel:${input.value}`;
}

function refreshInterface(val, cursorPos, returnCaret) {
  if (val.length >= 17) {
    refreshInput(val.substr(0, val.length), cursorPos, returnCaret);
    refreshLink(this);
    return;
  }

  refreshInput(val, cursorPos, returnCaret);
}

function cancelPrefixAltering(input, cursorPos) {
  if (cursorPos === 0 || cursorPos === 1) {
    input.value = input.value.substr(0, cursorPos) + input.value.substr(cursorPos + 1, input.value.length);
    if (input.value.length < 2) {
      input.value = '+7';
    }
    input.setSelectionRange(3, 3);
    return true;
  }
  return false;
}

function telChangeHandler() {
  let val = this.value;
  let cursorPos = getCursorPos(this, val);
  let returnCaret = false;

  if (cancelPrefixAltering(this, cursorPos)) { return; }

  if (!digitRegexp.test(val[cursorPos])) {
    val = val.substr(0, cursorPos) + val.substr(cursorPos + 1, val.length);
    returnCaret = true;
  }

  cursorPos = val[cursorPos + 1] ? cursorPos : -1;

  if (!telChangeHandler.prevLength) { telChangeHandler.prevLength = 2; }

  refreshInterface(val, cursorPos, returnCaret);
  telChangeHandler.prevLength = this.value.length;
}

const telInput = document.getElementById('wrapper__phone');

telInput.addEventListener('input', telChangeHandler);
