// 以前我们劫持的是属性（重写set和get）（新增的不行） $set $delete
// proxy 劫持的是对象 （代理，并没有增添额外的属性）（劫持的范围变大了）
function isObject(value) {
    return value !== null && typeof value === 'object'
}
const state = { name: 'zf', age: { n: {n:100} } }
// 最终返回的是代理对象，后续我们使用代理对象访问属性
function reactive(state) {
    const proxy = new Proxy(state, {
        get(target, key, receiver) {
            // target指代的是被代理源对象
            // key 是取值的属性
            // receiver 代理对象
            // 依赖收集
            // return target[key]
            let res = Reflect.get(target, key, receiver)
            if (isObject(res)) { // 懒代理
                return reactive(res)
            }
            return res
        },
        set(target, key, value, receiver) {
            console.log('用户设置值了')
            return Reflect.set(target, key, value, receiver)
        },
    })
    return proxy
}
// proxy支持数组和对象的新增以及删除，而且没有给属性重新定义。 性能好，是懒代理的
const proxy = reactive(state)

// 当我取到proxy.age 的时候发现他是一个对象，那我就把这个对象在进行代理
// Reflect 以后会将所有的Object的api全部放到reflect中
// Object.defineProperty  Reflect.defineProperty
// Object.setPrototypeof Reflect.setPrototypeof
