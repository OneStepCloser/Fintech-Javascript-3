/**
 * Реализовать функцию, поведение которой аналогично поведению Promise.all,
 * которая возвращает в качестве результата rejected промис c первым reject value или resolve с массивом resolveValues,
 * в соответствущих исходному массиву промисов позициях, если не было ни одного промиса с reject.
 * @param {Array<Promise>} promises - массив с исходными промисами
 * @return {Promise}
 */
function promiseAll(promises) {
  const resolveValues = Array(promises.length);
  let countDown = promises.length;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then(data => {
        resolveValues[index] = (data);
        countDown -= 1;
        if (!countDown) {
          resolve(resolveValues);
        }
      }, reject);
    });
  });
}

module.exports = promiseAll;
