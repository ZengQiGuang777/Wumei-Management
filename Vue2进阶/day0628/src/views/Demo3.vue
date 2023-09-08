<template>
    <div class="demo-box">
        <div>
            <span ref="AA">{{ x }}</span>
            <el-button ref="BB" size="small" @click="handleX">哈哈</el-button>
        </div>
        <div>
            <span>{{ y }}</span>
            <el-button size="small" @click="handleY">呵呵</el-button>
        </div>
        <el-button size="small" @click="handleForce">强制更新</el-button>
        <el-button size="small" @click="handleDestory">销毁组件</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            x: 10,
            y: 20
        }
    },
    methods: {
        handleX() {
            /* 
            // 在Vue中修改状态值，会触发对应 SETTER 劫持函数，在此函数中
            //   + 同步修改状态值「并且立即基于observe对新的值进行响应式处理」
            //   + 异步通知视图更新「每一次更改状态，并没有立即进行视图更新，而是把更新的操作，放在“更新队列”中，等待同步操作处理完毕，再把更新队列中的任务“统一批处理”一次，这样可以有效减少视图更新编译的次数，节约性能，让视图渲染的速度更快」
            this.x++
            this.y++
            console.log(this.x, this.y) //11 21 
            */

            this.x++
            this.$nextTick(() => {
                console.log('x更新后做的事情')
            })
        },
        handleY() {
            this.y++
            this.$nextTick(() => {
                console.log('y更新后做的事情')
            })
        },
        handleForce() {
            this.$forceUpdate()
        },
        handleDestory() {
            this.$destroy()
        }
    },
    /* 第一次渲染 */
    beforeCreate() {
        // 有实例this，只是还没有执行 initInjections/initProvide/initState 这些操作，导致实例上没有：属性、计算属性、状态、监听器、methods上的方法、上下文等信息！
        console.log('beforeCreate-->', this, this.x) //实例 undefined
    },
    created() {
        // 初始化完毕：该挂载和初始化的都处理完毕了
        console.log('created-->', this, this.x) //实例 10
    },
    beforeMount() {
        // 第一次渲染之前
        console.log('beforeMount-->')
    },
    mounted() {
        // 第一次渲染完毕：可以获取DOM元素/子组件实例了
        console.log('mounted-->', this.$refs)
    },
    /* 组件更新 */
    beforeUpdate() {
        // 组件更新之前
        console.log('beforeUpdate-->')
    },
    updated() {
        // 组件更新完毕
        console.log('updated-->')
    },
    /* 组件销毁 */
    beforeDestroy() {
        // 组件销毁之前
        console.log('beforeDestroy-->')
    },
    destroyed() {
        // 组件销毁之后
        console.log('destroyed-->', this, this.x, this.$refs)
    }
}
</script>

<style lang="less" scoped>
.demo-box {
    box-sizing: border-box;
    padding: 50px;
}
</style>