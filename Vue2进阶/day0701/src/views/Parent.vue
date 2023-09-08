<template>
    <div class="parent-box">
        <Child @md="childMounted" />
        <!-- <Child @hook:mounted="childMounted" /> -->
    </div>
</template>

<script>
import Child from './Child.vue'
export default {
    components: {
        Child
    },
    methods: {
        childMounted(...params) {
            console.log('子组件第一次渲染完毕了', params)
        }
    }
}
</script>

<style lang="less" scoped>
.parent-box {
    box-sizing: border-box;
    position: relative;
    margin: 20px auto;
    width: 200px;
    height: 200px;
    background: lightblue;
}
</style>