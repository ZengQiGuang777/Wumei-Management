// 检测是否为纯粹对象
const isPlainObject = function isPlainObject(obj) {
    let proto, Ctor;
    if (!obj || Object.prototype.toString.call(obj) !== "[object Object]") return false;
    proto = Object.getPrototypeOf(obj);
    if (!proto) return true;
    Ctor = proto.hasOwnProperty('constructor') && proto.constructor;
    return typeof Ctor === "function" && Ctor === Object;
};

// JSON数据转换
const filter = function filter(data) {
    try {
        data = JSON.parse(data);
    } catch (e) {
        data = [];
    }
    return data;
};

// 服务器返回结果
const responsePublic = function responsePublic(res, flag = true, options) {
    if (!isPlainObject(options)) options = {};
    options = Object.assign({
        code: flag ? 0 : 1,
        codeText: flag ? 'OK' : 'NO'
    }, options);
    res.send(options);
};

module.exports = {
    isPlainObject,
    filter,
    responsePublic
};