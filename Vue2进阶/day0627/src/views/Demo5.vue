<template>
    <!-- <div @click="bool = !bool" :class="{
        'demo-box': true,
        'active': bool
    }"></div> -->
    <!-- <div @click="bool = !bool" :class="['demo-box', bool ? 'active' : '']"></div> -->
    <!-- <div :class="['demo-box', act]"></div> -->

    <!-- <div @click="bool = !bool" :style="{
        boxSizing: 'border-box',
        width: '100px',
        height: '100px',
        background: 'lightblue',
        border: bool ? '4px solid red' : 'none'
    }"></div> -->

    <div :style="[aa, bb]">哈哈哈</div>
</template>

<script>
export default {
    data() {
        return {
            bool: true,
            act: 'active',
            aa: {
                color: 'red'
            },
            bb: {
                fontSize: '20px'
            }
        }
    }
}
</script>

<style lang="less" scoped>
.demo-box {
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    background: pink;

    &.active {
        border: 5px solid red;
    }
}
</style>