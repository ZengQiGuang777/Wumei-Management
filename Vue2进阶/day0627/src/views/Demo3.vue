<template>
    <div class="demo-box">
        <!-- <div v-for="(item, index) in arr" :key="item" v-if="index % 2 === 0">
            {{ item }}
        </div> -->

        <!-- template标记上使用v-for，是不能设置 key 的 -->
        <template v-for="(item, index) in arr">
            <div v-if="index % 2 === 0" :key="item">
                {{ item }}
            </div>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            arr: [10, 20, 30, 40]
        }
    }
}
</script>

<style lang="less" scoped>
.demo-box {
    div {
        margin-bottom: 10px;
        width: 100px;
        height: 100px;
        line-height: 100px;
        font-size: 18px;
        text-align: center;
        background: lightblue;
    }
}
</style>