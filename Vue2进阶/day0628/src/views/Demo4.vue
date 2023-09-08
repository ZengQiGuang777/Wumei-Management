<template>
    <div class="demo-box">
        <p>支持人数：{{ x }}</p>
        <p>反对人数：{{ y }}</p>
        <p>支持比率：{{ percent }}</p>
        <div class="footer">
            <el-button type="primary" size="small" @click="handle('sup')">支持</el-button>
            <el-button type="danger" size="small" @click="handle('opp')">反对</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            x: 10,
            y: 5,
            percent: '--'
        }
    },
    methods: {
        handle(type) {
            type === 'sup' ? this.x++ : this.y++
        },
        sum() {
            let total = this.x + this.y
            this.percent = total === 0 ? '--' : (this.x / total * 100).toFixed(2) + '%'
        }
    },
    computed: {
        ratio() {
            let total = this.x + this.y
            return total === 0 ? '--' : (this.x / total * 100).toFixed(2) + '%'
        }
    },
    watch: {
        x: 'sum',
        y: {
            handler: 'sum',
            immediate: true
        }
    }
}
</script>

<style lang="less" scoped>
.demo-box {
    box-sizing: border-box;
    margin: 20px auto;
    padding: 10px;
    width: 300px;
    border: 1px solid lightcoral;

    p {
        line-height: 35px;
    }

    .el-button {
        border-radius: 0;
        margin-right: 10px;
    }
}
</style>