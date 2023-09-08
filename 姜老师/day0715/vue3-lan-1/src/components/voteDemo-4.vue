<script>
import { computed, reactive, ref, watchEffect, toRef, toRefs, watch } from "vue"
// 父组件和子组件通信： props 传一个数据，这个数据可以再子组件中被消费
// props 和 attrs的关系  (props - 用户消费掉的属性) = attrs
// 插槽的通信 普通插槽、具名插槽、作用域插槽  插槽的传递模板
// ref来通信
import Xxx from "./xxx.vue"
export default {
  components: {
    Xxx
  },
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: ""
    },
    supChange: {
      type: Function
    }
  },
  emits: ["oppChange"],
  // props代表的是组件中的属性
  // attrs 组件除了props 和 emits 的属性,slots 插槽 ,emit 发射事件,expose 暴露的实例
  setup(props, { attrs, slots, emit, expose }) {
    const state = reactive({ opp: 5, sup: 5 })
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
    watch(
      () => state.sup,
      (newVal) => {
        // attrs.supChange(newVal) // 不是通过属性来接受的
        props.supChange(newVal)
      }
    )
    watch(
      () => state.opp,
      (newVal) => {
        // attrs.onOppChange(newVal) // 不是通过属性来接受的
        emit("oppChange", newVal)
      }
    )
    // 每个组件想被其他人的组件来访问  一般会指定expose属性，将需要暴露的暴露出去
    expose({
      change
    })

    return {
      ...toRefs(state),
      per,
      change,
      total,
      title: props.title
    }
  }
}
</script>
<template>
  <div class="box">
    <header>
      <slot name="content" :title="title">
        <div class="title">{{ title }}</div>
      </slot>
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
    <!-- <xxx v-bind="$attrs"></xxx> -->
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
