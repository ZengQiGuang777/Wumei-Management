<script setup>
import TodoList from './views/TodoList.vue'
</script>

<template>
  <TodoList />
</template>

<style lang="less">
@import url('./assets/reset.min.css');

button,
input {
  box-sizing: border-box;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #AAA;
  vertical-align: top;
}

button {
  cursor: pointer;
}
</style>
