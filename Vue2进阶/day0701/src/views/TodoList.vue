<template>
  <div class="todo-box">
    <div class="handle">
      <el-input placeholder="请输入任务描述" v-model.trim="text" />
      <el-button type="primary" @click="submit">新建任务</el-button>
    </div>
    <list-item v-for="item in list" :key="item.id" :info="item" @handle="handle" />
  </div>
</template>

<script>
import ListItem from "../components/ListItem.vue"
import _ from '@/assets/utils'

export default {
  components: {
    ListItem
  },
  data() {
    // 组件第一次渲染：先从本地存储中获取已有的任务列表
    let cache = _.storage.get('TODO_CACHE')
    return {
      // 任务列表
      list: cache || [],
      // 任务框中输入的内容
      text: ''
    }
  },
  methods: {
    // 新增任务操作
    submit() {
      // 验证text是否为空
      if (this.text.length === 0) {
        this.$message.warning('任务描述不能为空哦~')
        return
      }
      // 新增任务
      this.list.push({
        id: +new Date(),
        text: this.text
      })
      this.text = ''
    },
    // 修改/删除任务
    handle(type, id, text) {
      // type:操作类型  delete/update
      // id:要删除/修改任务项的编号
      // text:如果是修改操作，text存储的是要修改的信息
      if (type === 'delete') {
        this.list = this.list.filter(item => {
          return +item.id !== +id
        })
        return
      }
      if (type === 'update') {
        this.list = this.list.map(item => {
          if (+item.id === +id) {
            item.text = text
          }
          return item
        })
      }
    }
  },
  // 监听任务列表的变化，把最新的信息存储到本地
  watch: {
    list: {
      deep: true,
      handler() {
        _.storage.set('TODO_CACHE', this.list)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.todo-box {
  box-sizing: border-box;
  margin: 50px auto;
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