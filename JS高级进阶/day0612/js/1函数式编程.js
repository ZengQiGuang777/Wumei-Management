/*
 细节知识点：
   @1 函数式编程 && 命令式编程
      函数式编程:把具体的操作过程“封装”到一个函数中,我们无需关注内部是如何处理的(How),只需要关注处理的结果(What)即可;
        + 使用便捷,开发效率高
        + 减少页面冗余代码「低耦合高内聚」
      命令式编程:具体如何去处理,是由自己实现及掌控的,关注How的过程！
        + 操作灵活,可以自主把控处理的每一个步骤
        + 处理性能一般比函数式编程式要好「例如：forEach循环要慢于for循环」
      总结：处理的数据量“较多”的情况下，使用命令式编程来提高性能！操作逻辑较为复杂，需要自己灵活把控处理步骤的情况下，也使用命令式编程！其余情况，优先推荐函数式编程！

   @2 匿名函数具名化
     特点：原本应该是匿名函数「例如：自执行函数、函数表达式、回调函数等」，但是我们会为其设置一个名字
     + 更规范的操作方式
     + 有助于匿名函数的递归操作
 */

// let arr = [10, 20, 30, 40]
// 如果是依次迭代数组每一项，则函数式编程更加的方便
/* arr.forEach((item, index) => {
  console.log(item)
}) */
/* for (let i = 0; i < arr.length; i++) {
  console.log(arr[i], i)
} */

// 但是对于一些复杂的处理逻辑，还是要使用命令式编程，自己去管控操作的步骤
/* arr.forEach((item, index) => {
  if (index % 2 === 0) {
    console.log(item)
  }
})
for (let i = 0; i < arr.length; i += 2) {
  console.log(arr[i])
} */

/* // 需求：循环五次
new Array(5).fill(null).forEach(() => {
  console.log('AAA')
}) */


//=======================
/* // 这样创建函数，因为变量提升的机制，导致函数可以在“定义的代码”之前/之后执行都可以，逻辑不严谨！！
fn()
function fn() {
  console.log('fn')
}
fn() */

/* // 基于函数表达式的方式创建函数，可以抵消变量提升的影响，函数只能在创建的代码后执行！！
fn() //Uncaught ReferenceError: Cannot access 'fn' before initialization
const fn = function () {
  console.log('fn')
} */

/* // 匿名函数具名化：原本应该是一个匿名函数，但是现在我们给其设置了名字
const fn = function fn() { 
  // ...
} */


/* (function fn() {
  // console.log(fn) //但是在函数内部是可以使用这个名字的，代表当前函数本身
})();
// console.log(fn) //Uncaught ReferenceError: fn is not defined  即便具名化，函数也没有在外层作用域中声明「导致在外面依然是用不了的」 */

/* "use strict";
let n = 12;
(function () {
  if (n >= 15) return
  n++
  arguments.callee() //函数本身 严格模式下会报错 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
})();
console.log(n); */

/* // 方便匿名函数实现递归
"use strict";
let n = 12;
(function fn() {
  if (n >= 15) return
  n++
  fn()
})();
console.log(n); */

/* (function fn() {
  fn = 10
  console.log(fn) //不允许直接修改函数名对应的值  函数本身
})(); */

/* (function fn() {
  let fn = 10
  console.log(fn) //如果被用其它方式声明，则会以其它声明的为主
})(); */