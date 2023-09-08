/*
 let/const 变量：类型限定 = 值
   + 变量不能是已经被 lib.dom.d.ts 声明的，例如：name
     但可以把当前文件变为一个模块 “ 加入 export 导出 ”，这样在这里声明的变量都是私有的了
   + 类型限定可以是小写和大写
     + 一般用小写
     + 大写类型可以描述实例
     + 大写的 Object 不用，因为所有值都是其实例；想要笼统表示对象类型，需要用 object ！
   + 数组的限定
     let arr:number/string[]
     let arr:(number|string)[]
     let arr:Array<string> 泛型
     ...
   + TS中的元祖：类型和长度固定
     let tuple:[string, number] = ['abc', 10]
     可基于数组的方法操作元祖
   + TS中的枚举
     enum USER_ROLE {
        ADMIN,
        USER
     }
   + null 和 undefined 只能赋予本身的值
   + void 用于函数的返回
     function fn():void{ ... }
     function fn():void | null{ ... }
   + never 不可能出现的值「任何类型的子类型」
     function fn():never{ 
        // 报错 OR 死循环 等
     }
   + any 任意类型
 */
