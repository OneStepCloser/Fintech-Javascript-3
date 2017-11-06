const digitRegexp = new RegExp('[0-9]');

function getDigitSequence(charSequence) {
  //alert(charSequence);
  const subLines = charSequence.split('');
  let result = '';

  for (let i = 0; i < subLines.length; ++i) {
    if (digitRegexp.test(subLines[i])) {
      if (i === 1 && subLines[i] !== '7') { result += '7'; } else { result += subLines[i]; }
      //result += subLines[i];
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
    if (i === 7) { result += '-'; }
    if (i === 9) { result += '-'; }
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
  //alert(prevPos);
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
  const cursorPos = val.slice(0, input.selectionStart).length - 1;
  // if (!val[cursorPos + 1]) { cursorPos = -1; }

  return cursorPos;
}

function telChangeHandler() {
  let val = this.value;
  let cursorPos = getCursorPos(this, val);
  let returnCaret = false;

  if (!digitRegexp.test(val[cursorPos])) {
    val = val.substr(0, cursorPos) + val.substr(cursorPos + 1, val.length);
    returnCaret = true;
  }

  if (!val[cursorPos + 1]) { cursorPos = -1; }

  if (!telChangeHandler.prevLength) { telChangeHandler.prevLength = 2; }

  if (val.length < 2) {
    this.value = '+7';
    return;
  }

  if (val.length >= 17) {
    //alert('hi');
    this.value = getMaskedNumber(getDigitSequence(val.substr(0, val.length)));
    setCaretOnDelete(this, cursorPos);
    setCaretOnAdd(this, cursorPos);

    const link = document.getElementById('link');

    link.text = `Позвонить на ${this.value}`;
    link.href = `tel:${this.value}`;

    return;
  }

  this.value = getMaskedNumber(getDigitSequence(val));

   //alert(telChangeHandler.prevLength);
   //alert(this.value.length);

  if (telChangeHandler.prevLength > this.value.length) {
    //alert(2);
    setCaretOnDelete(this, cursorPos);
  }
  else if (telChangeHandler.prevLength < this.value.length){
    //alert(3);
    setCaretOnAdd(this, cursorPos);
  }
  else if (returnCaret) {
    //alert(1);
    remainCaretTheSame(this, cursorPos);
  }

  telChangeHandler.prevLength = this.value.length;
}

const telInput = document.getElementById('wrapper__phone');

telInput.addEventListener('input', telChangeHandler);
