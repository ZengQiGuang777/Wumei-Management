<template>
  <div id="app">
    <div class="nav-box">
      <router-link to="/" exact>首页</router-link>
      <router-link to="/product">产品中心</router-link>
      <router-link to="/personal">个人中心</router-link>
    </div>
    <div class="content">
      <KeepAlive include="Home">
        <router-view />
      </KeepAlive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
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

* {
  border-radius: 0 !important;
}


#app {
  margin: 0 auto;
  width: 400px;
}

.nav-box {
  display: flex;
  border-bottom: 1px solid #AAA;

  a {
    padding: 0 10px;
    font-size: 16px;
    color: #000;
    line-height: 50px;

    // 设置选中的样式
    &.router-link-active,
    &.router-link-exact-active {
      font-size: 18px;
      color: rgb(236, 51, 51);
    }
  }
}

.content {
  padding: 10px;
  font-size: 14px;
}
</style>