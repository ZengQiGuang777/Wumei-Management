<template>
  <div id="app">
    <Demo />
  </div>
</template>

<script>
import TodoList from './views/TodoList.vue'
import Demo from './views/Demo2.vue'

export default {
  name: 'App',
  components: {
    TodoList,
    Demo
  }
}
</script>

<style lang="less">
@import './assets/reset.min.css';

html,
body,
#app {
  height: 100%;
  font-size: 14px;
  overflow: hidden;
}

.el-button,
.el-input,
.el-input__inner {
  border-radius: 0;
}
</style>
