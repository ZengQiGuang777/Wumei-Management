<template>
  <div class="vote-footer">
    <el-button type="primary" @click="$root.$emit('AAA', 'sup')">支持</el-button>
    <el-button type="danger" @click="$root.$emit('AAA', 'opp')">反对</el-button>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.vote-footer {
  .el-button {
    margin-right: 10px;
  }
}
</style>