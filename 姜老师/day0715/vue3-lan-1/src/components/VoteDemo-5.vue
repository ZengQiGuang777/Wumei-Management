<script setup>
import { useAttrs, watch ,useSlots } from "vue"
import { useVote } from "./vote"
const { sup, opp, total, per, change } = useVote()
// 在setup语法糖中 defineProps定义属性
const props = defineProps(["title"]) // 属性
// 获取所有的属性
const attrs = useAttrs()
watch(sup, (newVal) => {
    attrs.supChange(newVal);
});
// 事件发布的问题
const emit =  defineEmits(['oppChange'])
watch(opp, (newVal) => {
    emit('oppChange',newVal)
})
// 使用插槽
const slots = useSlots()
// props , {attrs,emit,slots,expose}
// 暴露导出的方法
defineExpose({
    change
})


</script>



<template>
  <div class="box">
    <header>
      <slot name="content" :title="title">
        <div class="title">{{ props.title }}</div>
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
