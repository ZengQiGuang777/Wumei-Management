<script>
import { reactive, computed, watch, watchEffect } from "vue"
export default {
  setup() {
    // 创建一个响应式对象 reactive() 内部采用是new Proxy(target)
    const state = reactive({ sup: 5, opp: 5, per: 0 })
    // const { sup, opp } = state;
    // 如果用老的写法，所有的变量都需要返回，才能在模板中使用。 最终放到了组件的实例上

    // 计算属性只有使用才执行，而且多次取值如果依赖的值没有变化，不会重新的执行
    const total = computed({
      // 写对象的格式我们可以修改计算属性的值，修改后在set方法可以操作其他属性
      get: () => {
        return state.sup + state.opp // 10 进行包装（装包） 底层采用的事getter和setter的方式来实现的
      },
      set: (newVal) => {}
    })
    const change = (type) => {
      if (type === "sup") {
        state.sup++
      } else {
        state.opp++
      }
    }
    // 什么时候用watch 什么时候用computed？
    // watch 监控某个值的变化，更新其他值， 发送一些请求
    // 计算属性 根据已经有的属性 衍生一个新的属性, 衍生的结果可以用在模板上 (同步返回的)

    // const per = computed(() => {
    //   return ((state.sup / total.value) * 100).toFixed(2) + "%"
    // })

    // vue2中不能直接监控一个响应式数据, watch可以watch一个 计算属性或者 reactive也可以
    // watch(total, (newVal,oldVal) => {
    //     state.per = ((state.sup / newVal) * 100).toFixed(2) + "%"
    // },{immediate:true})

    // 这种写法浪费性能 不建议使用
    // watch(state, (newVal,oldVal) => {
    //     console.log('watch')
    //     state.per = ((state.sup / newVal) * 100).toFixed(2) + "%"
    // },{immediate:true,deep:true})

    // 监控力度比较小
    // watch([() => state.sup, () => state.opp], function () {
    //   state.per = ((state.sup / total.value) * 100).toFixed(2) + "%"
    // })

    // 此方法默认会执行一次，如果函数中依赖的变量，发生变化则会重新再执行一次
    watchEffect(() => {
        state.per = ((state.sup / total.value) * 100).toFixed(2) + "%"
    })

    // 能用计算属性解决的我们一般不用watch
    // watch监控一个响应式的数据 computed， reactive  watch一个函数返回一个值 watch一个数组 
    // watchEffect 被动追踪依赖，如果值发生变化会重新执行

    // 分页 onMounted 掉一个接口获取数据
    // 5页 -》 调用一个接口来获取数
    return {
      state,
      total,
      change
    }
  },
  mounted() {
    console.log(this)
  }
}
</script>
<template>
  <div class="box">
    <header>
      <div class="title">标题</div>
      <div class="title">{{ total }}</div>
    </header>
    <div class="main">
      <div>
        <van-button @click="change('sup')">支持</van-button> <span>人数 {{ state.sup }}</span>
      </div>
      <div>
        <van-button @click="change('opp')">反对</van-button> <span>人数 {{ state.opp }}</span>
      </div>
    </div>
    <footer>
      <span>支持率 {{ state.per }}</span>
    </footer>
  </div>
</template>
<style scoped>
.box {
  width: 300px;
  margin: 100px auto 0;
  border: 1px solid #ccc;
}
header {
  display: flex;
  background: rgb(9, 189, 195);
  justify-content: space-between;
  padding: 5px;
  font-size: 25px;
}
.main {
  display: flex;
  flex-direction: column;
  padding: 5px;
}
.main .van-button {
  margin-right: 10px;
}
footer {
  font-size: 16px;
}
</style>
