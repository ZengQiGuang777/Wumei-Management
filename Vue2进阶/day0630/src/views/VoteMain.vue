<template>
  <div class="vote-main">
    <p>支持人数：{{ obj.x }} 人</p>
    <p>反对人数：{{ obj.y }} 人</p>
  </div>
</template>

<script>
export default {
  inject: ['obj']
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