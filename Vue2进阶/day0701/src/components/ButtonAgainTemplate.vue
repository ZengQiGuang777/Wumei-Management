<template>
    <!-- 
      ButtonAgain组件：
        + 使用方式需要和 ElButton 保持一致
        + 只不过 loading 效果，组件内部处理好即可
    -->
    <el-button :type="type" :size="size" :icon="icon" :native-type="nativeType" :disabled="disabled" :plain="plain"
        :autofocus="autofocus" :round="round" :circle="circle" :loading="loading" @click="handle" ref="child">
        <slot></slot>
    </el-button>
</template>

<script>
export default {
    name: "ButtonAgain",
    // 对于传递进来的属性，不论ElButton是否需要，都不让其显示在结构上
    inheritAttrs: false,
    // 接收传递的属性「只接收ElButton需要的，但对于ElButton需要，用户没传的，我们依然要为其设置默认值」
    props: {
        type: {
            type: String,
            default: 'default'
        },
        size: String,
        icon: {
            type: String,
            default: ''
        },
        nativeType: {
            type: String,
            default: 'button'
        },
        disabled: Boolean,
        plain: Boolean,
        autofocus: Boolean,
        round: Boolean,
        circle: Boolean
    },
    data() {
        return {
            loading: false
        }
    },
    methods: {
        /* 
         点击ElButton的时候
           + 控制 loading 效果
           + 把调用 ButtonAgain 时，向其事件池中注入的 click 自定义事件（也就是异步请求的操作），触发执行「等待其处理完毕」 
        */
        async handle(ev) {
            this.loading = true
            try {
                await this.$listeners.click(ev)
            } catch (err) {
                console.log('ButtonAgain Error：', err.message)
            }
            this.loading = false
        }
    },
    // 第一次渲染完毕后，我们可以获取到ElButton的实例，我们这个实例赋值给 ButtonAgain 实例的 ElButtonIns 这个属性！！
    mounted() {
        this.ElButtonIns = this.$refs.child
    }
}
</script>

<style lang="less" scoped></style>