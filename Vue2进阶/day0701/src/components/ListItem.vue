<template>
  <div class="item-box" v-if="info">
    <div class="content">
      <el-input size="mini" v-if="isUpdate" v-model.trim="copyText" />
      <span class="textCon" v-else>{{ copyText }}</span>
    </div>
    <div class="handle">
      <el-popconfirm title="您确定要删除本条任务吗？" @confirm="removeHandle">
        <el-button type="danger" size="mini" slot="reference">删除</el-button>
      </el-popconfirm>
      <el-button type="success" size="mini" v-if="!isUpdate" @click="triggerUpdate">
        修改
      </el-button>
      <template v-else>
        <el-button type="success" size="mini" @click="saveUpdate">
          保存
        </el-button>
        <el-button type="info" size="mini" @click="cancelUpdate">
          取消
        </el-button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  // 注册接收属性
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  // 定义状态
  data() {
    return {
      isUpdate: false,
      copyText: this.info.text
    }
  },
  // 定义操作的方法
  methods: {
    // 删除任务
    removeHandle() {
      // 把父组件中存储的某条任务删除
      this.$emit('handle', 'delete', this.info.id)
    },
    // 触发修改操作
    triggerUpdate() {
      this.isUpdate = true
    },
    // 保存修改的信息
    saveUpdate() {
      if (this.copyText.length === 0) {
        this.$message.warning('任务描述不能为空哦~')
        return
      }
      // 把父组件中存储的某条任务进行修改
      this.$emit('handle', 'update', this.info.id, this.copyText)
      this.isUpdate = false
    },
    // 取消修改操作
    cancelUpdate() {
      this.isUpdate = false
      this.copyText = this.info.text
    }
  }
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