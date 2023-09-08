<template>
  <div class="item-box">
    <div class="content">
      <el-input size="mini" />
      <span class="textCon">哈哈哈</span>
    </div>
    <div class="handle">
      <el-popconfirm title="您确定要删除本条任务吗？">
        <el-button type="danger" size="mini" slot="reference">删除</el-button>
      </el-popconfirm>
      <el-button type="success" size="mini">修改</el-button>
      <el-button type="success" size="mini">保存</el-button>
      <el-button type="info" size="mini">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
.item-box {
  margin: 15px 0;

  .content {
    margin-bottom: 5px;

    .textCon {
      line-height: 30px;
      font-size: 14px;
    }

    .el-input {
      width: 200px;
    }
  }

  .handle {
    .el-button {
      margin-right: 10px;
      margin-left: 0;
    }
  }
}
</style>