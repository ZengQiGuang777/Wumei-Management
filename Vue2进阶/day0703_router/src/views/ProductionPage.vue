<template>
  <div class="production-box">产品中心的内容</div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    console.log('产品中心：beforeRouteEnter')
    next()
  },
  created() {
    console.log('产品中心-初始化完毕：created')
  },
  beforeMount() {
    console.log('产品中心-第一次渲染之前：beforeMount')
  },
  mounted() {
    console.log('产品中心-第一次渲染完毕：mounted')
  }
}
</script>

<style lang="less" scoped></style>