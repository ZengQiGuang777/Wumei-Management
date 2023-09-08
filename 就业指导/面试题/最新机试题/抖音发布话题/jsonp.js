(function () {
  const isPlainObject = function isPlainObject(obj) {
    let proto, Ctor;
    if (!obj || Object.prototype.toString.call(obj) !== "[object Object]") return false;
    proto = Object.getPrototypeOf(obj);
    if (!proto) return true;
    Ctor = proto.hasOwnProperty('constructor') && proto.constructor;
    return typeof Ctor === "function" && Ctor === Object;
  };

  const stringify = function stringify(obj) {
    let keys = Reflect.ownKeys(obj),
      str = ``;
    keys.forEach(key => {
      str += `&${key}=${obj[key]}`;
    });
    return str.substring(1);
  };

  const jsonp = function jsonp(url, options) {
    if (typeof url !== "string") throw new TypeError('url is not a string~');
    if (!isPlainObject(options)) options = {};
    let { params, jsonpName } = Object.assign(
      {
        params: null,
        jsonpName: 'callback'
      },
      options
    );
    return new Promise((resolve, reject) => {
      let name = `jsonp${+new Date()}`,
        script;
      window[name] = function (data) {
        resolve(data);
        if (script) document.body.removeChild(script);
        Reflect.deleteProperty(window, name);
      };
      if (params && isPlainObject(params)) {
        params = stringify(params);
        url += `${url.includes('?') ? '&' : '?'}${params}`;
      }
      url += `${url.includes('?') ? '&' : '?'}${jsonpName}=${name}`;
      script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  };

  /* 暴露API */
  if (typeof module === 'object' && typeof module.exports === 'object') module.exports = jsonp;
  if (typeof window !== 'undefined') window.jsonp = jsonp;
})();