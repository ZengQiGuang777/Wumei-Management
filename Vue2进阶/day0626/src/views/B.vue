<template>
    <div>
        <button @click="handle">
            我是子组件的按钮 ，父组件的状态是：{{ x }}
        </button>
    </div>
</template>

<script>
export default {
    props: ['x'],
    methods: {
        handle() {
            this.$emit('update:x', 1000)
        }
    }
}
</script>