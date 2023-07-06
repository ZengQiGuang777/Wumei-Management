<script>
export default {
    name: "Bread-crumbs",
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<template>
    <div class="demo-box">
        <span>首页</span>
    </div>
</template>

<style lang="less" scoped>
.demo-box {
    width: 100%;
    height: 32px;
    padding-left: 24px;
    background-color: #fff;
    border-top: 1px solid #d8dce5;
    border-bottom: 1px solid #d8dce5;

    span {
        display: inline-block;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-top: 2px;
    }
}
</style>