<template>
    <div @click="handleClick">我是一个按钮</div>
</template>

<script>
export default {
    emits:['click'], // 标识哪些事件是自定义的
    methods: {
        handleClick() {
            this.$emit('click','hello')
        }
    }
}
</script>