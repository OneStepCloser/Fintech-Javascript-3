/**
 * Исправьте проблему с таймером: должны выводиться числа от 0 до 9.
 * Доп. задание: предложите несколько вариантов решения.
 */
function timer(logger = console.log) {
  for (let i = 0; i < 10; i++) { // replacing "var" with "let" allows to create it's own i variable for each loop iteration
    setTimeout(() => {
      logger(i);
    }, 100);
  }
}

// Another option:

/**function timer(logger = console.log) {
  for (var i = 0; i < 10; i++) {
    const currentI = i; // saving the state of i variable each iteration of the loop
    setTimeout(() => {
      logger(currentI);
    }, 100);
  }
}
 **/


/*= ============================================ */

/**
 * Создайте собственную реализацию функции bind
 * @param {Function} func передаваемая функция
 * @param {any} context контекст
 * @param {Array<any>} args массив аргументов
 * @return {Function} функция с нужным контекстом
 */
function customBind(func, context, ...args) {
  return function(...rest) {
    return func.apply(context, args.concat(rest));
  };
}

/*= ============================================ */

/**
 * Напишите функцию sum, вычисляющую суммы подобным образом:
 * sum(1)(2)( ) // 3
 * sum(1)(2)(3)( ) // 6
 * sum :: Number -> sum
 * sum :: void -> Number
 */
function sum(x) {

  if (!sum.result) {
    sum.result = 0;
  }

  if (arguments.length === 0) {
    let temp = sum.result;
    sum.result = 0;
    return temp;
  }

  else {
    sum.result += x;
    return sum;
  }
}

/*= ============================================ */

/**
 * Определите, являются ли строчки анаграммами (например, “просветитель” — “терпеливость”).
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
function anagram(first, second) {
  if (first.length !== second.length)
    return false;

  let firstCounter = {};
  let secondCounter = {};

  for (let i = 0; i < first.length; ++i) {

    let currentCharacterFromFirst = first[i];
    if (!firstCounter[currentCharacterFromFirst])
      firstCounter[currentCharacterFromFirst] = 1;
    else
      firstCounter[currentCharacterFromFirst] += 1;

    let currentCharacterFromSecond = second[i];
    if (!secondCounter[currentCharacterFromSecond])
      secondCounter[currentCharacterFromSecond] = 1;
    else
      secondCounter[currentCharacterFromSecond] += 1;
  }

  let firstCounterKeys = Object.keys(firstCounter);
  let secondCounterKeys = Object.keys(secondCounter);

  if (firstCounterKeys.length !== secondCounterKeys.length)
    return false;

  for (let i = 0; i < firstCounterKeys.length; ++i) {
    let currentCharacter = firstCounterKeys[i];
    if (firstCounter[currentCharacter] !== secondCounter[currentCharacter])
      return false;
  }

  return true;
}

/*= ============================================ */

/**
 * Сократите массив до набора уникальных значений
 * [1,1, 2, 6, 3, 6, 2] → [1, 2, 3, 6]
 * @param {Array<number>} исходный массив
 * @return {Array<number>} массив уникальных значений, отсортированный по возрастанию
 */
function getUnique(arr) {
  let itemSet = {};

  for (let i = 0; i < arr.length; ++i) {
    let item = arr[i];
    itemSet[item] = item;
  }

  return Object.keys(itemSet).map((key) => itemSet[key]).sort((a, b) => a - b);
}

/**
 * Найдите пересечение двух массивов
 * [1, 3, 5, 7, 9] и [1, 2, 3, 4] → [1, 3]
 * @param {Array<number>, Array<number>} first, second исходные массивы
 * @return {Array<number>} массив уникальных значений, отсортированный по возрастанию
 */
function getIntersection(first, second) {

  let firstSet = getUnique(first);
  let secondSet = getUnique(second);

  return firstSet.filter((item1) => secondSet.some(item2 => item1 === item2));
  
}

/* ============================================= */

/**
 * Две строки называются изоморфными, когда в строке A можно заменить
 * конкретный символ на любой другой для получения строки B. (Расстояние Левенштейна, при возможных мутациях
 * ограничивающихся заменой символа - отличается на 1).
 * Отдельно стоит отметить что строка изоморфна самой себе.
 * Порядок символов должен остаться неизменным. Каждый
 * последовательный символ в строке A сравнивается с
 * каждым последовательным символов в строке B.
 *
 * @param  {string} left
 * @param  {string} right
 * @return {boolean}
 */
function isIsomorphic(left, right) {
  if (left.length !== right.length)
    return false;

  let inappropriateDistance = false;

  for (let i = 0; i < left.length; ++i) {
    if (left[i] !== right[i]) {
      if (inappropriateDistance)
        return false;
      inappropriateDistance = true;
    }
  }

  return true;
}

module.exports = {
  timer,
  customBind,
  sum,
  anagram,
  getUnique,
  getIntersection,
  isIsomorphic
};