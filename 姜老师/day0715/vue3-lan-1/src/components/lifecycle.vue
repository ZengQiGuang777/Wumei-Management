<!-- <script>
import { onBeforeUnmount } from "vue"
import { getCurrentInstance, onBeforeMount, onMounted, onBeforeUpdate, onUpdated } from "vue"
// vue3 api 都是函数的方式，vue3 就通过setup函数作为入口来使用
// vue3 将生命周期全部进行了重写，改成函数的方式
// 不建议在采用老的选项api的写法了

// 组件的组成 模板 （生命周期 、 属性 、 状态 、 事件 、 通信方式 、 插槽 ）  样式 （webComponent）
// beforeCreate created  -> setup(来取代 setup执行的比这两个都早)
// beforeMount mounted -> onBeforeMount  onMounted
// beforeUpdate updated -> onBeforeUpdate  onUpdated
// beforeDestroy destroyed -> onbeforeUnmount onUnmounted

// onErrorCapture  errorHandler (可以监控代码的异常，把结果上报到服务器中，开发者可以看到错误)

// 组合式的特点，就是将逻辑组合在一起，可以提取，也可以复用
// setup中不能访问this
function useLifecycle() {
  onBeforeMount(() => {
    console.log("onBeforeMount 1")
  })
  onBeforeMount(() => {
    console.log("onBeforeMount 2")
  })
  onBeforeMount(() => {
    console.log("onBeforeMount 3")
  })
  onMounted(() => {
    console.log("onMounted")
  })
  onBeforeUpdate(() => {
    console.log("onBeforeUpdate")
  })
  onUpdated(() => {
    console.log("onUpdated")
  })
  onBeforeUnmount(() => {
    console.log("onBeforeUnmount")
  })
  onUnmounted(() => {
    console.log("onUnmounted")
  })

  // keep-alive 两个钩子 onActivated, onDeactivated
}
export default {
  name:'xxxx',
  setup() {
    useLifecycle()
    const { proxy } = getCurrentInstance()
    proxy.$showToast()
  },
  
}
</script> -->
<!-- <script>
export default {
    name: 'xxxx',
    inheritAttrs: false,
    mounted() {
        console.log('abc')
    }
}
</script> -->
<script setup>
import { getCurrentInstance, onBeforeMount, onMounted, onBeforeUpdate, onUpdated ,onBeforeUnmount,onUnmounted} from "vue"
function useLifecycle() {
  onBeforeMount(() => {
    console.log("onBeforeMount 1")
  })
  onBeforeMount(() => {
    console.log("onBeforeMount 2")
  })
  onBeforeMount(() => {
    console.log("onBeforeMount 3")
  })
  onMounted(() => {
    console.log("onMounted")
  })
  onBeforeUpdate(() => {
    console.log("onBeforeUpdate")
  })
  onUpdated(() => {
    console.log("onUpdated")
  })
  onBeforeUnmount(() => {
    console.log("onBeforeUnmount")
  })
  onUnmounted(() => {
    console.log("onUnmounted")
  })

  // keep-alive 两个钩子 onActivated, onDeactivated
}
// vue3.3中新增了defineOptionsApi 可以再setup语法糖中使用 optionsApi
defineOptions({
    name: 'xxxx',
    inheritAttrs: false,
})

// 在开发的时候 我们肯定采用“语法糖” 写起来很开心 
</script>
<template>
    <div>aaa</div>
</template>

<style scoped></style>
