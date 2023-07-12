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
        <a-tag >
            首页
        </a-tag>
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

    .ant-tag {
        background-color: #fff;
        width: 70px;
        text-align: center;
        margin-right: 5px;
        margin-top: 4px;
    }
}
</style>