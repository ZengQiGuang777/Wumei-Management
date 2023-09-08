<script>
import { computed, reactive, ref, watchEffect,toRef,toRefs } from "vue"

export default {
  setup() {
    // ref 更加灵活支持任何的类型，但是reactive 只能防对象
    const state = reactive({ opp: 5, sup: 5 })
    // const opp = toRef(state, 'opp'); // 错误写法 state.opp
    // const sup = toRef(state, 'sup');
    // const obj = ref({})  // 内部会对值进行判断如果是对象 则会进行value:reactive()
    // console.log(obj.value)
    const total = computed(() => {
      return state.opp + state.sup
    })
    const per = ref(0) // computedRefImpl
    watchEffect(() => {
      per.value = (state.sup / total.value) * 100 + "%"
    })
    const change = (type) => {
      type === "sup" ? state.sup++ : state.opp++
    }
    return {
      ...toRefs(state), // toRefs 就是将对象里面的所有属性转换成ref，并且把对象展开
      per,
      change,
      total
    }
  }
}
</script>
<template>
  <div class="box">
    <header>
      <div class="title">标题</div>
      <div class="title">总人数 {{ total }}</div>
    </header>
    <div class="main">
      <div>
        <van-button @click="change('sup')">支持</van-button> <span>人数 {{ sup }}</span>
      </div>
      <div>
        <van-button @click="change('opp')">反对</van-button> <span>人数 {{ opp }}</span>
      </div>
    </div>
    <footer>
      <span>支持率 {{ per }}</span>
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
