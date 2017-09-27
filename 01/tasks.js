/**
 * найдите минимум и максимум в любой строке
 * @param  {string} string входная строка(числа отделены от других частей строки пробелами или знаками препинания)
 * @return {{min: number, max: number}} объект с минимумом и максимумом
 * '1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028' => { min: -1028, max: 15 }
 */
function getMinMax(string) {
  const result = string.match(/-?\d+(.\d+)?/g);
  let minimum = Number.POSITIVE_INFINITY;
  let maximum = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < result.length; ++i) {
    if (minimum > +result[i]) {
      minimum = +result[i];
    }
    if (maximum < +result[i]) {
      maximum = +result[i];
    }
  }

  return { min: minimum, max: maximum };
}

/* ============================================= */

/**
 * Напишите рекурсивную функцию вычисления чисел Фибоначчи
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
function fibonacciSimple(x) {
  if (x < 0) {
    return null;
  }

  return (x === 0) || (x === 1) ? x : fibonacciSimple(x - 2) + fibonacciSimple(x - 1);
}

/* ============================================= */

/**
 * Напишите функцию для вычисления числа Фибоначчи с мемоизацией:
 * при повторных вызовах функция не вычисляет значения, а достает из кеша.
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
function fibonacciWithCache(x) {
  if (x < 0) {
    return null;
  }

  if (!fibonacciWithCache.cache) {
    fibonacciWithCache.cache = {};
  }

  if (fibonacciWithCache.cache[x]) {
    return fibonacciWithCache.cache[x];
  }

  const result = (x === 0) || (x === 1) ? x : fibonacciWithCache(x - 2) + fibonacciWithCache(x - 1);

  fibonacciWithCache.cache[x] = result;
  return result;
}

/* ============================================= */

/**
 * Напишите функцию printNumbers, выводящую числа в столбцах
 * так, чтобы было заполнено максимальное число столбцов при
 * минимальном числе строк.
 * Разделитель межу числами в строке - один пробел,
 * на каждое число при печати - отводится 2 символа
 * Пример работы: printNumbers(11, 3)
 *  0  4  8
 *  1  5  9
 *  2  6 10
 *  3  7 11
 * @param  {number} max  максимальное число (до 99)
 * @param  {number} cols количество столбцов
 * @return {string}
 */
function printNumbers(max, cols) {
  let result = '';

  const rows = Math.ceil((max + 1) / cols);

  if (max + 1 < cols) {
    cols = max + 1;
  }

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols && j * rows + i <= max; ++j) {
      const current = j * rows + i;

      result += (current < 10 ? ' ' : '') + current + (j === cols - 1 ? '' : ' ');
    }
    if (i !== rows - 1) {
      result += '\n';
    }
  }
  console.log(result);
  return result;
}

/* ============================================= */

/**
 * Реализуйте RLE-сжатие: AAAB -> A3B, BCCDDDEEEE -> BC2D3E4
 * @param  {string} input
 * @return {string}
 */
function rle(input) {
  let result = '';
  let currentChar;
  let currentNumber = 1;

  for (let i = 0; i < input.length; ++i) {
    currentChar = input[i];

    if (i !== input.length - 1 && currentChar === input[i + 1]) {
      currentNumber += 1;
    } else {
      result += currentNumber === 1 ? currentChar : currentChar + currentNumber;
      currentNumber = 1;
    }
  }

  return result;
}

module.exports = {
  getMinMax,
  rle,
  printNumbers,
  fibonacciSimple,
  fibonacciWithCache
};
