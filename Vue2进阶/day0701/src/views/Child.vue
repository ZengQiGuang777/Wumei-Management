<template>
    <div class="child-box">
        <button ref="btn">子组件按钮</button>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$emit('md', this.$refs.btn)
    }
}
</script>

<style lang="less" scoped>
.child-box {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: lightcoral;
}
</style>