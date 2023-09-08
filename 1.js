/**
 * @param {*} timer
 * @returns
 */
function slepp(timer = 2000) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timer);
  });
}
