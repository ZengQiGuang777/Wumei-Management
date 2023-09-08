<template>
  <div id="app" style="max-width: 540px;">
    <music-page />
  </div>
</template>

<script>
import MusicPage from './views/MusicPage.vue'
export default {
  name: 'App',
  components: {
    MusicPage
  }
}
</script>

<style lang="less">
@import './assets/reset.min.css';

html,
body,
#app {
  height: 100%;
  overflow: hidden;
}

#app {
  position: relative;
  margin: 0 auto;
  font-size: 14px;
}
</style>