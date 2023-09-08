<template>
  <div id="app" style="max-width: 540px;">
    <Vote />
  </div>
</template>

<script>
import Demo from './views/Demo.vue'
import Vote from './views/Vote.vue'

export default {
  name: 'App',
  components: {
    Demo,
    Vote
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


#app {
  margin: 0 auto;
}

.el-button,
.el-input,
.el-input__inner {
  border-radius: 0;
}
</style>