<template>
  <div class="personal-box">
    <div class="left">
      <router-link to="/personal/order">我的订单</router-link>
      <router-link to="/personal/profile">我的信息</router-link>
    </div>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.personal-box {
  display: flex;

  .left {
    a {
      display: block;
      line-height: 40px;
      font-size: 14px;
      color: #000;

      &.router-link-active {
        color: #409EFF;
      }
    }
  }

  .right {
    padding: 10px;
    color: #555;
    font-size: 12px;
  }
}
</style>