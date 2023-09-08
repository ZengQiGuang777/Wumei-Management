<template>
    <div class="child-box">
        <slot name="head" :a1="a1" :a2="a2" :bb="10"></slot>
        我是子组件{{ a1 + a2 }}
        <slot :a1="a1" :a2="a2"></slot>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: ['x', 'fn'],
    data() {
        return {
            a1: 1000,
            a2: 2000
        }
    },
    created() {
        console.log('子组件的实例：', this)

        // this.fn(100, 200)
        // console.log(this.x) //10 获取注册接收的属性值
        // console.log(this.$attrs.y) //20 没有被props注册接收的，在$attrs中
    }
}
</script>