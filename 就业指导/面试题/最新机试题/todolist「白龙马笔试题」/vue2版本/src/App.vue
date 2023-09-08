<template>
  <div id="app">
    <todo-list />
  </div>
</template>

<script>
import TodoList from "./views/TodoList.vue";

export default {
  name: "App",
  components: {
    TodoList,
  },
};
</script>

<style lang="less">
@import url("./assets/reset.min.css");

button,
input {
  box-sizing: border-box;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #aaa;
  vertical-align: top;
}

button {
  cursor: pointer;
}
</style>