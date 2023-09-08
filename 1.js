/**
 * @param {*} timer
 * @returns
 */
function slepp(timer = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timer);
  });
}
