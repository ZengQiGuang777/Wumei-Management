<template>
    <div class="child-box">
        子组件
    </div>
</template>

<script>
/* 
 针对父组件传递进来的属性
   + class/style：不能被 props 注册接收，也不会在 $attrs 中，只会直接设置在子组件的“根元素”上
   + 可以基于 props 注册接收（细节如下面所示）
   + 没有被 props 注册接收的属性，可以在 $attrs 中获取「也可以在子组件的根元素上看到」
 对于传递的属性，如果不想让其出现在根元素上（排除class/style）？
   + 基于 props 注册接收即可
   + 也可以设置 inheritAttrs:false
 ----
 针对于父组件传递的自定义事件
   + 基于 $listeners 获取子组件事件池中，所有的“自定义事件和绑定的方法”
   + 基于 $emit 通知自定义事件执行，传递实参信息
   this.$emit('update:x',100) => 返回值是子组件的实例
   this.$listeners.close(...) => 返回值是父组件对应方法执行的返回结果
 */
export default {
    /*
     基于 props 注册接收的属性
       + 都会直接挂在到实例上，而且进行了响应式劫持
       + 被注册的属性：不会出现在“根元素”上，也不会出现在$attrs中
       + 注册接收的时候，还可以对属性进行规则校验「如果传递的属性值，不符合校验规则，控制台会抛出警告错误，但是不影响属性的获取和视图的渲染」
         https://v2.cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81
     */
    props: {
        x: {
            type: [Number, String],
            default: 0
        },
        title: {
            type: String,
            required: true
        },
        bool: {
            type: Boolean,
            default: false
        },
        info: Object
    },
    inheritAttrs: false,
    created() {
        // console.log(this)
        // let res = this.$listeners.close(200)
        // console.log('子组件中，接收父组件handle执行的返回结果：', res)
    }
}
</script>