<template>
    <div class="demo-box">
        <el-button type="primary" @click="handle">提示</el-button>
    </div>
</template>

<script>
export default {
    name: "Demo",
    methods: {
        handle() {
            // 基于执行 this.$toast([text],[?time]) 方法，渲染Toast组件
            this.$toast('哈哈哈哈哈')
        }
    }
}
</script>

<style lang="less" scoped>
.demo-box {
    padding: 20px;
}
</style>