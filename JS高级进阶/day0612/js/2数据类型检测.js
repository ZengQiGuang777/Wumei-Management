/*
typeof数据类型检测的底层机制
  特点1：返回的结果是字符串，字符串中包含了对应的数据类型
    + typeof typeof typeof [1,2,3] => "string"
  特点2：按照计算机底层存储的二进制进行检测「效率高」
    + 000 对象
    + 1 整数
    + 010 浮点数
    + 100 字符串
    + 110 布尔
    + 000000… null
    + -2^30 undefined
    + ……
    ------
    typeof按照二进制进行检测的时候，认为以“000”开始的就是对象类型
      + 因为null存储的是64个零，所以被识别为对象，导致：typeof null -> “object”
      + 如果检测出来是对象，再去看是否实现了call方法；如果实现了，说明其是一个函数对象，返回“function”；
      + 如果没有实现call，都返回“object”；
  特点3：typeof null -> “object”
  特点4：typeof 对象 -> “object” && typeof 函数 -> “function”
    + typeof不能检测null，也无法对“对象”进行细分（除函数对象外）
  特点5：typeof 未被声明的变量 -> “undefined”

  typeof在实战中的运用：
    @1 检测除null以外的原始值类型
    @2 笼统的校验是否为对象
    @3 检测是否为函数  => if(typeof obj==="function"){...}
    @4 处理浏览器兼容「ES6+语法规范，都不兼容IE」
*/
const isObject = function isObject(value) {
  if (value === null) return false
  return /^(object|function)$/.test(typeof value)
}

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_precedence#%E6%B1%87%E6%80%BB%E8%A1%A8
const isFunction = function isFunction(value) {
  return typeof value === "function"
}

// 需求：获取对象所有的私有属性
/* let obj = {
  name: 'obj',
  age: 15,
  [Symbol('AA')]: 100
}
let keys = Object.getOwnPropertyNames(obj)
if (typeof Symbol !== "undefined") {
  // 非IE浏览器
  keys = keys.concat(Object.getOwnPropertySymbols(obj))
}
console.log(keys)  */

/* let keys = Reflect.ownKeys(obj)
console.log(keys)  //['name', 'age', Symbol(AA)] */






/* 
JS中数据类型检测汇总
  @1 typeof [value]

  @2 对象 instanceof 构造函数
    原本的意义是用来检测“某个对象是否是相应类的实例”，只不过针对于这个特点，我们可以用其检测一些数据类型
      + 检测是否为数组：值 instanceof Array
      + 检测是否为正则：值 instanceof RegExp
      + ...
      也就是基于 instanceof ，可以弥补 typeof 不能细分对象的缺陷！
    特点：
      + 无法检测原始值类型，返回结果都是false
      + 原本不是检测数据类型的，现在非要让其检测类型，所以检测的结果不一定精准 
    原理：
      依次查找对象的原型链（__proto__），一直到 Object.prototype ，在此过程中，如果 构造函数.prototype 出现在了其原型链的某个环节，则说明 当前对象 是此构造函数的一个实例，检测结果就是true！

  @3 constructor
    获取对象的构造函数，从而判断是否是属于某一个数据类型
    只不过这种方式我们一般很少去使用，因为 constructor 值是可以被更改的「修改值的成本低」，一但被更改，则检测结果是不准确的！

  @4 Object.prototype.toString.call([value])
    + 不仅仅 Object.prototype 上有 toString 方法，在 Number/String/Boolen/Array/Function... 的原型对象上，也有 toString 方法，只不过其它原型上的toString方法都是用来转换为字符串的，只有Object.prototype.toString是用来检测数据类型的
    + 把 Object.prototype 上的 toString 方法执行，让方法中的 this 指向要检测的数据值，这样就可以返回此数据值的数据类型 -> "[object ?]"
      特点：精准且强大「唯一不足就是写起来麻烦一丢丢」
      + “？”一般情况下，就是检测值所属的构造函数（前提：内置的构造函数）
      + 如果被检测的值具备 Symbol.toStringTag 这个属性，那么属性值是啥，最后检测结果中的“？”就是啥
    
    此办法虽然很不错，但是也不是所有的数据类型检测都使用这个办法，一般来讲：需要笼统的检测或者按照大的类别去检测，使用 typeof 会更方便，而需要很精准检测的时候，使用 toString 会更好！！

  ---
  快捷方法：
    + isNaN 检测是否为有效数字
    + Array.isArray 检测是否为数组
    + ...
*/

// instanceof
/* console.log([] instanceof Array) //true
console.log([] instanceof Object) //true
console.log(/\d+/ instanceof Array) //false */
/* let obj = {}
obj.__proto__ = Array.prototype //Object.setPrototypeOf(obj, Array.prototype)
console.log(obj instanceof Array) */

// constructor
/* console.log([].constructor === Array) //true
console.log([].constructor === Object) //false 只有对象的原型链是直接指向Object.prototype的，则其 constructor 属性值才是 Object「除非本身所属类的原型对象上没有 constructor...」-> “标准普通对象/纯粹的对象” */

// // Object.prototype.toString.call([value])
// const toString = Object.prototype.toString


// 检测是否为纯粹对象
const toString = Object.prototype.toString
const isPlainObject = function isPlainObject(obj) {
  // 先校验:如果基于 toString/call ，检测结果都不是 [object Object]，则一定不是纯粹对象
  if (toString.call(obj) !== "[object Object]") return false
  let proto = Object.getPrototypeOf(obj)
  if (!proto) return true
  let Ctor = 'constructor' in obj && obj.constructor
  return Ctor === Object
}