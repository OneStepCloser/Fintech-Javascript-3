/**
 * Изменить поведение чисел таким образом, чтобы указанные конструкции были эквивалетны при условии,
 * что римские цифры могут быть любыми.
 * 0..V => [0, 1, 2, 3, 4]
 * 0..VII => [0, 1, 2, 3, 4, 5, 6]
 * 0..X => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * Подсказка - необходимо использовать Proxy - объекты
 * */
function parseRoman(romanStr, sum) {
  if (!romanStr[0]) {
    return sum;
  }

  const firstDigit = parseRoman.dictionary[romanStr[0]];
  const secondDigit = parseRoman.dictionary[romanStr[1]];

  if (firstDigit < secondDigit) {
    return parseRoman(romanStr.substr(2), sum + (secondDigit - firstDigit));
  }
  return parseRoman(romanStr.substr(1), sum + firstDigit);
}

parseRoman.dictionary = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

const handler = {
  get(target, property, receiver) {
    const res = parseRoman(property, 0);

    return Array.from(Array(res - receiver), (val, index) => index + receiver);
  }
};
const proxy = new Proxy(Object.getPrototypeOf(Number.prototype), handler);

Object.setPrototypeOf(Number.prototype, proxy);
