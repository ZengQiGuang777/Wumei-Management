<template>
  <div id="app">
    <Demo />
  </div>
</template>

<script>
import Demo from './views/Demo4.vue'
export default {
  name: 'App',
  components: {
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
</style>
