<template>
  <div id="app">
    <Vote />
  </div>
</template>

<script>
import Vote from './views/Vote.vue'
import Demo from './views/Demo.vue'

export default {
  name: 'App',
  components: {
    Vote,
    Demo
  },
  // 公共信息 & 修改公共信息的方法
  data() {
    return {
      obj: {
        x: 10,
        y: 5
      }
    }
  },
  methods: {
    change(isSup) {
      isSup ? this.obj.x++ : this.obj.y++
    }
  },
  // 把这些东西都放在上下文中
  provide() {
    return {
      obj: this.obj,
      change: this.change
    }
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
