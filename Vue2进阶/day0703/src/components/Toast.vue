<script>
export default {
    name: "Toast",
    /* 注册接收属性 */
    props: {
        // 传递的提示消息信息
        text: {
            type: String,
            default: ''
        },
        // 过多久后消失（单位毫秒）
        time: {
            type: [Number, String],
            default: 2000
        }
    },
    /* 第一次渲染完：设置定时器，到达指定时间后，把组件销毁 */
    mounted() {
        let time = +this.time
        if (isNaN(time)) time = 2000
        this.destoryTimer = setTimeout(() => {
            this.$destroy()
            clearTimeout(this.destoryTimer)
        }, time)
    },
    /* 销毁后：把真实的DOM从视图中移除掉 */
    destroyed() {
        clearTimeout(this.destoryTimer)
        let ele = this.$el
        ele.parentNode.removeChild(ele)
    }
}
</script>

<template>
    <div class="toast-box">
        {{ this.text }}
    </div>
</template>

<style lang="less" scoped>
.toast-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    box-sizing: border-box;
    padding: 10px 20px;
    background: rgba(0, 0, 0, .5);
    font-size: 14px;
    color: #FFF;
    line-height: 30px;
    border-radius: 4px;
}
</style>