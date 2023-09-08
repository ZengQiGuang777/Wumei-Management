<template>
  <div class="vote-footer">
    <el-button type="primary" @click="change(true)">支持</el-button>
    <el-button type="danger" @click="change(false)">反对</el-button>
  </div>
</template>

<script>
export default {
  inject: ['change']
}
</script>

<style lang="less" scoped>
.vote-footer {
  .el-button {
    margin-right: 10px;
  }
}
</style>