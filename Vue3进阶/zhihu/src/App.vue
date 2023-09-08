<script setup>
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="Home">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style lang="less">
@import './assets/reset.min.css';

.van-button {
  border-radius: 0 !important;
}

html,
body,
#app {
  min-height: 100vh;
  overflow-x: hidden;
  background: #f4f4f4;
}

#app {
  margin: 0 auto;
  background: @CR_W;
}

.van-skeleton {
  padding: 30px 15px;
}
</style>
