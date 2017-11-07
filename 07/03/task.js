/* eslint-disable func-style */
/**
 * Исправьте проблему с таймером: должны выводиться числа от 0 до 9.
 * Доп. задание: предложите несколько вариантов решения.
 */
// O_o
function throttle(time, callback) {
  let isReady = true;

  return (...args) => {
    if (isReady) {
      callback.apply(this, args);
      isReady = false;
      setTimeout(() => { isReady = true; }, time);
    }
  };
}

module.exports = { throttle };
