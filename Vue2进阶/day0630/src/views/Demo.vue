<template>
    <div class="demo-box">
        我是父组件
        <Child ref="childIns" :x="x" :y="y" :fn="parentHandle">
            <template v-slot="{ a1 }">
                <button>
                    哈哈哈{{ a1 }}
                </button>
            </template>
            <template #head="scoped">
                <!-- scoped是一个对象，包含给name='head'插槽传递的三个属性值 {a:1000,a2:2000,bb:10} -->
                <button>
                    呵呵呵
                    {{ scoped.a2 }}
                </button>
            </template>
        </Child>
    </div>
</template>

<script>
import Child from './Child.vue'

export default {
    components: {
        Child
    },
    data() {
        return {
            x: 10,
            y: 20
        }
    },
    methods: {
        parentHandle(n, m) {
            console.log(this, n, m)
        }
    },
    mounted() {
        console.log('父组件的实例：', this)
        // console.log(this.$refs.childIns) //获取子组件的实例
    }
}
</script>

<style lang="less" scoped>
.demo-box {
    box-sizing: border-box;
}
</style>