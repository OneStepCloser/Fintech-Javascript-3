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

function telChangeHandler() {
  const val = this.value;

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
}

const telInput = document.getElementById('wrapper__phone');

telInput.addEventListener('input', telChangeHandler);
