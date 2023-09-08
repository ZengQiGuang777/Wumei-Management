<template>
    <div class="demo-box">
        <el-button type="danger" :loading="deleteLoading" @click="handleDelete">
            删除
        </el-button>

        <el-button type="primary" :loading="updateLoading" @click="handleUpdate">
            修改
        </el-button>
    </div>
</template>

<script>
export default {
    name: "Demo",
    data() {
        return {
            deleteLoading: false,
            updateLoading: false
        }
    },
    methods: {
        async handleDelete() {
            this.deleteLoading = true
            try {
                let { code } = await this.$API.query(2000)
                if (+code === 0) {
                    this.$message.success('恭喜您，删除成功!')
                } else {
                    this.$message.error('删除失败，请稍后再试!')
                }
            } catch (_) { }
            this.deleteLoading = false
        },
        async handleUpdate() {
            this.updateLoading = true
            try {
                let { code } = await this.$API.query()
                if (+code === 0) {
                    this.$message.success('恭喜您，修改成功!')
                } else {
                    this.$message.error('修改失败，请稍后再试!')
                }
            } catch (_) { }
            this.updateLoading = false
        }
    }
}
</script>

<style lang="less" scoped>
.demo-box {
    box-sizing: border-box;
    margin: 20px auto;
    padding: 20px;
    width: 200px;
    border: 1px solid lightcoral;

    .el-button {
        display: block;
        margin-bottom: 20px;
        margin-left: 0;
    }
}
</style>