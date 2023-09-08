<template>
    <div class="demo-box">
        <button-again type="danger" plain size="small" @click="handleDelete" ref="AA">
            删除
        </button-again>

        <button-again type="primary" circle icon="el-icon-edit" @click="handleUpdate">
        </button-again>
    </div>
</template>

<script>
export default {
    name: "Demo",
    methods: {
        async handleDelete() {
            try {
                let { code } = await this.$API.query(2000)
                if (+code === 0) {
                    this.$message.success('恭喜您，删除成功!')
                } else {
                    this.$message.error('删除失败，请稍后再试!')
                }
            } catch (_) { }
        },
        async handleUpdate() {
            try {
                let { code } = await this.$API.query()
                if (+code === 0) {
                    this.$message.success('恭喜您，修改成功!')
                } else {
                    this.$message.error('修改失败，请稍后再试!')
                }
            } catch (_) { }
        }
    },
    mounted() {
        console.log(this.$refs.AA)
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