<template>
  <div class="home-box">首页的内容</div>
</template>

<script>
export default {
  name: 'Home',
  beforeRouteLeave(to, from, next) {
    console.log('首页：beforeRouteLeave')
    next()
  },
  beforeDestroy() {
    console.log('首页-组件销毁之前：beforeDestroy')
  },
  destroyed() {
    console.log('首页-组件销毁之后：destroyed')
  },
  created() {
    console.log('首页-第一次渲染之前：created')
  },
  activated() {
    console.log('缓存的组件被激活（开始渲染呈现）：activated')
  },
  deactivated() {
    console.log('缓存的组件被失活（从页面中移除）：deactivated')
  }
}
</script>

<style lang="less" scoped></style>