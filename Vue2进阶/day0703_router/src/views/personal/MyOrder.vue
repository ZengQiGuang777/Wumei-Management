<template>
  <div class="order-box">
    <el-button type="primary" size="mini" @click="handle">跳转到我的信息</el-button>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  methods: {
    handle() {
      let obj = {
        lx: 'wx',
        name: 'zhufeng'
      }

      /* // @1 问号传参
      // this.$router.push(`/personal/profile?${qs.stringify(obj)}`)
      this.$router.push({
        // path: '/personal/profile',
        name: 'personal_profile',
        query: obj
      }) */

      /* // @3 隐式传参
      this.$router.push({
        name: 'personal_profile',
        params: obj
      }) */

      // @2 路径参数
      this.$router.push(`/personal/profile/${obj.lx}/${obj.name}`)
    }
  }
}
</script>

<style lang="less" scoped>
.order-box {
  box-sizing: border-box;
}
</style>