/**
 * @param {*} timer
 * @returns
 */
function sleep(timer = 3000) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timer);
  });
}
