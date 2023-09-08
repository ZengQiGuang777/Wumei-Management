<template>
  <div class="todo-box">
    <div class="handle">
      <el-input />
      <el-button type="primary">新建任务</el-button>
    </div>
    <list-item />
  </div>
</template>

<script>
import ListItem from "../components/ListItem.vue"

export default {
  components: {
    ListItem
  }
}
</script>

<style lang="less" scoped>
.todo-box {
  box-sizing: border-box;
  margin: 20px auto;
  width: 400px;

  .handle {
    padding-bottom: 20px;
    border-bottom: 1px dashed #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-button {
      margin-left: 20px;
    }
  }
}
</style>