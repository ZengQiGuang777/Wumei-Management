// let proxy = {name:'zf'}
// with (proxy) {
//     console.log(proxy.name)
// }


// Object.defineProperty({getter})
const total = { // ref的实现原理  
    _value: null,
    get value() { 
        console.log('依赖收集')
        return this._value
    },
    set value(val) {
        this._val = val
    }
}
console.log(total.value)
total.value = 'abc'
console.log(total.value)
 