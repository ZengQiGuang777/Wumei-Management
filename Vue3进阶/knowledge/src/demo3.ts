/*
 函数的玩法
   普通函数：声明参数和返回值类型
     function fn(x:number,y:number):number{...}
   函数表达式：在普通函数基础上，对赋值的函数做类型校验 
     type Fn = (x:number,y?:number) => number
     let fn:Fn = function(x,y){...}
 */
