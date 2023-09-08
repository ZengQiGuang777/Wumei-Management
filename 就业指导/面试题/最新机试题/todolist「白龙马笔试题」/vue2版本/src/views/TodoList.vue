<template>
  <div class="todoBox">
    <div class="handle">
      <input type="text" class="textInp" v-model.trim="text" />
      <button class="createBtn" @click="submit">新建任务</button>
    </div>
    <list-item
      v-for="item in list"
      :key="item.id"
      :item="item"
      @change="change"
    />
  </div>
</template>

<script>
/* 创建本地存储，保存任务数据 */
const store = {
  get() {
    let data = localStorage.getItem("totoList"),
      value = [];
    if (data) {
      data = JSON.parse(data);
      if (+new Date() - data.time <= 24 * 60 * 60 * 1000) {
        value = data.value;
      }
    }
    return value;
  },
  set(value) {
    let data = {
      time: +new Date(),
      value,
    };
    localStorage.setItem("totoList", JSON.stringify(data));
  },
};

import ListItem from "../components/ListItem.vue";
export default {
  name: "TodoList",
  components: {
    ListItem,
  },
  data() {
    return {
      list: store.get(),
      text: "",
    };
  },
  methods: {
    /* 新增任务 */
    submit() {
      if (this.text === "") {
        alert("请先输入内容！");
        return;
      }
      this.list.push({
        id: +new Date(),
        text: this.text,
      });
      this.text = "";
      store.set(this.list);
    },
    /* 子组件触发改变 */
    change({ id, text, type }) {
      // 修改
      if (type === "update") {
        this.list = this.list.map((item) => {
          if (+item.id === +id) {
            item.text = text;
          }
          return item;
        });
        store.set(this.list);
        return;
      }
      // 删除
      this.list = this.list.filter((item) => {
        return +item.id !== +id;
      });
      store.set(this.list);
    },
  },
};
</script>

<style lang="less" scoped>
.todoBox {
  box-sizing: border-box;
  margin: 20px auto;
  padding: 10px;
  width: 400px;
  border: 1px solid #ddd;

  .handle {
    padding-bottom: 10px;
    border-bottom: 1px dashed #ddd;

    .createBtn {
      margin-left: 20px;
      background: #93d5ed;
      border-color: #8bd5f0;
    }
  }
}
</style>