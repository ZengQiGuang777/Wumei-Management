/*
 类型断言：
 @1 声明变量，没有给类型限定，没有赋值的时候，默认类型是any
 @2 如果最开始声明的时候赋值了，则会按照此时值的类型自动推导
 @3 联合类型
   let name:string | number
   + 在没有赋值之前，只能使用联合类型规定的类型，进行相关的操作
   + 不能在变量赋值之前调用其方法
   + !. 断言变量一定有值
   + as 认定是啥类型的值
   (name! as number).toFixed()
 @4 字面量类型
   let direction:'top'|'right'|'down'|'left' 赋的值只能是这四个中的一个{限定了值}
   可以基于 type （类型别名）优化
     let Direction = 'top'|'right'|'down'|'left'
     let direction:Direction = ...
 */

export {}
