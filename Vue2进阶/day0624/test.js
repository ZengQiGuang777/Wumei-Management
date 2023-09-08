/* 检测是否为纯粹对象 */
const toString = Object.prototype.toString
const isPlainObject = function isPlainObject(obj) {
    if (toString.call(obj) !== "[object Object]") return false
    let proto = Object.getPrototypeOf(obj)
    if (!proto) return true
    let Ctor = 'constructor' in obj && obj.constructor
    return Ctor === Object
}

/* 给对象设置不可枚举的属性 */
const define = function define(obj, key, value) {
    Object.defineProperty(obj, key, {
        value,
        enumerable: false,
        writable: true,
        configurable: true
    })
    return obj
}

/* 通知视图更新 */
const notify = function notify() {
    console.log('视图更新')
}

/* 重写7个方法的对象 */
let arrayProto = Array.prototype,
    arrayMethods = Object.create(arrayProto),
    methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
methods.forEach(method => {
    let original = arrayProto[method] //对应Array.prototype上的内置方法
    define(arrayMethods, method, function mutator(...args) {
        // 基于内置的方法，把功能先实现「this：我们操作的数组」
        let result = original.call(this, ...args)
        // 对于新增/修改的信息，需要基于递归，进行深层次的监听劫持
        let inserted
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2)
                break
            default:
        }
        if (inserted) observeArray(inserted)
        // 通知视图更新
        notify()
        return result
    })
})

/* 数据劫持的处理 */
const defineReactive = function defineReactive(obj, key, proxy) {
    // 对成员的规则再次校验
    let property = Object.getOwnPropertyDescriptor(obj, key)
    if (property && property.configurable === false) return
    // 对此成员的值进行深度处理
    observe(obj[key])
    // 对此成员进行数据劫持
    Object.defineProperty(obj, key, {
        get: function reactiveGetter() {
            return proxy[key]
        },
        set: function reactiveSetter(newVal) {
            // 新老值相同，则不进行任何的处理
            if (Object.is(newVal, obj[key])) return
            // 修改值
            proxy[key] = newVal
            // 对新设置的值也要进行深度处理
            observe(newVal)
            // 通知视图更新
            notify()
        }
    })
}

/* 对数组/对象进行响应式处理 */
const observeArray = function observeArray(arr) {
    // 对传递数组中的每一项，都基于 observe 进行响应式处理
    arr.forEach(item => {
        observe(item)
    })
}
const observe = function observe(data) {
    let isArray = Array.isArray(data),
        isObject = isPlainObject(data)
    // 如果是数组/对象，并且不是被冻结/密封/阻止扩展的，我们才处理
    if ((isArray || isObject) && Object.isExtensible(data)) {
        // 防止套娃操作
        if (data.hasOwnProperty('__ob__')) return data
        define(data, '__ob__', true)
        // 数组：重定向其原型指向 & 对数组每一项进行深度处理
        if (isArray) {
            data.__proto__ = arrayMethods //Object.setPrototypeOf(data, arrayMethods)
            observeArray(data)
        }
        // 对象：迭代对象中的每一项，对每一项都基于 defineProperty 进行数据劫持
        if (isObject) {
            let keys = Object.keys(data),
                proxy = { ...data }
            keys.forEach(key => {
                defineReactive(data, key, proxy)
            })
        }
    }
    return data
}


//==============做测试
let data = {
    msg: '哈哈哈',
    obj: {
        x: 10,
        y: {
            z: [100, 200]
        }
    },
    arr: [1, 2, { n: 1000 }]
}
data.data = data
observe(data)