<script setup>
import NavBack from "../components/NavBack.vue"
</script>

<template>
  <nav-back title="个人中心" />
  <div class="base-info">
    <img src="../assets/images/timg.jpg" alt="" />
    <p>账号名称</p>
  </div>
  <van-cell-group>
    <van-cell title="我的收藏" is-link url="#/store" />
    <van-cell title="退出登录" />
  </van-cell-group>
</template>

<style lang="less" scoped>
.base-info {
  box-sizing: border-box;
  margin: 20px 0;

  img {
    display: block;
    margin: 0 auto;
    width: 86px;
    height: 86px;
    border-radius: 50%;
  }

  p {
    line-height: 50px;
    font-size: 18px;
    text-align: center;
  }
}
</style>