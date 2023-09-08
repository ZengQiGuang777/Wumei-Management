<template>
    <div class="demo-box">
        <div class="text">{{ num }}</div>
        <el-button type="primary" size="small" @click="handle">按钮</el-button>
    </div>
</template>

<script>
export default {
    data: {
        num: 0
    },
    methods: {
        handle() {
            this.num += 10
        }
    }
}
</script>

<style lang="less" scoped>
.demo-box {
    box-sizing: border-box;
    margin: 10px auto;
    padding: 10px;
    width: 200px;
    background: lightblue;
}
</style>