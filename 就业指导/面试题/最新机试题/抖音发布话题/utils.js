(function () {
    const clearTimer = function clearTimer(timer) {
        if (timer) clearTimeout(timer);
        return null;
    };

    // 函数防抖
    const debounce = function debounce(func, wait, immediate) {
        if (typeof func !== 'function') throw new TypeError('func is not a function~');
        if (typeof wait === 'boolean') immediate = wait;
        if (typeof wait !== 'number') wait = 300;
        if (typeof immediate !== "boolean") immediate = false;
        let timer = null;
        return function operate(...params) {
            let now = !timer && immediate,
                result;
            timer = clearTimer(timer);
            timer = setTimeout(() => {
                if (!immediate) func.call(this, ...params);
                timer = clearTimer(timer);
            }, wait);
            if (now) result = func.call(this, ...params);
            return result;
        };
    };

    // 函数节流
    const throttle = function throttle(func, wait) {
        if (typeof func !== 'function') throw new TypeError('func is not a function~');
        if (typeof wait !== 'number') wait = 300;
        let timer = null,
            previous = 0;
        return function operate(...params) {
            let now = +new Date(),
                remaining = wait - (now - previous),
                result;
            if (remaining <= 0) {
                result = func.call(this, ...params);
                previous = +new Date();
                timer = clearTimer(timer);
            } else if (!timer) {
                timer = setTimeout(() => {
                    func.call(this, ...params);
                    previous = +new Date();
                    timer = clearTimer(timer);
                }, remaining);
            }
            return result;
        };
    };

    let utils = {
        debounce,
        throttle
    };

    /* 导出模块 */
    if (typeof module === "object" && typeof module.exports === "object") module.exports = utils;
    if (typeof window !== 'undefined') window.utils = utils;
})();