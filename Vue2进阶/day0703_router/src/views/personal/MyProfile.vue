<template>
  <div class="profile-box">我的信息</div>
</template>

<script>
export default {
  created() {
    /* 
     接收传递的参数信息，主要是基于：this.$route 「存储了当前路由匹配的信息」 
       + path / fullPath
       + name
       + meta
       + query
       + params
       ....
     */

    /* // @1 接收问号传参的信息
    console.log(this.$route.query) */

    /* // @3 接收隐式传递的信息
    console.log(this.$route.params) */

    // @2 接收问号传参信息
    console.log(this.$route.params)
  }
}
</script>

<style lang="less" scoped>
.profile-box {
  box-sizing: border-box;
}
</style>