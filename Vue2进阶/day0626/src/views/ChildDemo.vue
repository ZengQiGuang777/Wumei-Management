<template>
    <div class="child">
        <button @click="handle">
            我是子组件的按钮 ，父组件的状态是：{{ value }}
        </button>
    </div>
</template>

<script>
export default {
    // 自定义v-model传递的 属性/自定义 事件名字 
    model: {
        prop: 'value',
        event: 'update'
    },
    // 注册接收父组件传递的属性信息「会把接收的属性挂载到实例上」
    props: ['value'],
    methods: {
        handle() {
            this.$emit('update', 10000)
        }
    }
}
</script>

<style lang="less" scoped>
.child {
    background: lightgreen;
}
</style>