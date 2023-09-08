<template>
    <div class="parent">
        我是父组件
        <br>
        {{ num }}

        <br><br><br>
        <child-demo v-model="num" />
        <!-- 
          给子组件设置 v-on(@)，并非做事件绑定，而是：给子组件的事件池中，注入一个自定义事件
            + 在Vue2中，每一个类组件都有一个自己的事件池（容器）
            + 下面操作相当于，向子组件事件池中，加入一个叫做 "input" 的自定义事件，值就是后面绑定的方法
            + 在子组件内部，可以基于 $emit 通知这个自定义事件执行，并且传递实参值
        -->
        <!-- <child-demo :value="num" @input="num = $event" /> -->
    </div>
</template>

<script>
import ChildDemo from './ChildDemo.vue'
export default {
    components: {
        ChildDemo
    },
    data() {
        return {
            num: 100
        }
    },
    methods: {
        AAA(...params) {
            console.log(params)
        }
    }
}
</script>

<style lang="less" scoped>
.parent {
    background: lightcoral;
}
</style>