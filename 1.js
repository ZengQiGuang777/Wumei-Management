/**
 * @param {*} timer
 * @returns
 */

function sleep(timer = 2000) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timer);
  });
}
