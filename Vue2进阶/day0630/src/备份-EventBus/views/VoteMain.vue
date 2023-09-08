<template>
  <div class="vote-main">
    <p>支持人数：{{ $root.supNum }} 人</p>
    <p>反对人数：{{ $root.oppNum }} 人</p>
    <p>支持比率：{{ ratio }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    ratio() {
      let { supNum, oppNum } = this.$root
      let total = supNum + oppNum
      return total === 0 ? '--' : (supNum / total * 100).toFixed(2) + '%'
    }
  }
}
</script>

<style lang="less" scoped>
.vote-main {
  p {
    padding: 5px;
    line-height: 34px;
    font-size: 14px;
  }
}
</style>