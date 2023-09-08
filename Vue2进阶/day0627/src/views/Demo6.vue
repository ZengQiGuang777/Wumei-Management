<template>
    <div class="demo-box">
        <h2 class="title">哈哈哈哈哈</h2>
        <div class="con">
            <el-button type="primary" icon="el-icon-message">我是按钮</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
.demo-box {
    box-sizing: border-box;
    background: lightblue;

    .title {
        font-size: 20px;
    }

    .el-button {
        border-radius: 0;
    }

    :deep(.el-icon-message) {
        font-size: 30px;
    }
}
</style>