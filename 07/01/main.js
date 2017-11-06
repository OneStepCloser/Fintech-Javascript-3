function getDigitSequence(charSequence) {
  const digitRegexp = new RegExp('[0-9]');
  const subLines = charSequence.split('');
  let result = '';

  for (let i = 0; i < subLines.length; ++i) {
    if (digitRegexp.test(subLines[i])) {
      result += subLines[i];
    }
  }

  return result;
}

function getMaskedNumber(digitSequence) {
  const subLines = digitSequence.split('');

  let result = '';

  for (let i = 0; i < subLines.length; ++i) {
    if (i === 0) { result += '+'; }
    if (i === 1) { result += '('; }
    if (i === 4) { result += ')-'; }
    if (i === 7) { result += '-'; }
    if (i === 9) { result += '-'; }
    result += subLines[i];
  }

  return result;
}

function setCaret(input, prevPos) {
  if (prevPos < 0) { return; }
  let targetPos = prevPos + 1;

  if (prevPos === 7) { targetPos = prevPos - 1; }
  if (prevPos === 11 || prevPos === 14) { targetPos = prevPos; }
  if (prevPos <= 3) { targetPos = 3; }
  input.setSelectionRange(targetPos, targetPos);
}

function getCursorPos(input, val) {
  let cursorPos = val.slice(0, input.selectionStart).length - 1;

  if (!val[cursorPos + 1]) { cursorPos = -1; }

  return cursorPos;
}

function telChangeHandler() {
  const val = this.value;
  const cursorPos = getCursorPos(this, val);

  if (val.length < 2) {
    this.value = '+7';
    return;
  }

  if (val.length === 17) {
    const link = document.getElementById('link');

    link.text = `Позвонить на ${val}`;
    link.href = `tel:${val}`;
    return;
  }

  if (val.length > 17) {
    this.value = val.substr(0, val.length - 1);
    return;
  }


  this.value = getMaskedNumber(getDigitSequence(val));


  setCaret(this, cursorPos);
}

const telInput = document.getElementById('wrapper__phone');

telInput.addEventListener('input', telChangeHandler);
