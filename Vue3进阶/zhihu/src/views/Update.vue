<script setup>
import NavBack from "../components/NavBack.vue"
</script>

<template>
  <nav-back title="修改个人信息" />
  <div class="form-box">
    <van-cell-group inset>
      <van-field label="用户名" label-width="60px" />
      <van-field label="用户头像" label-width="60px">
        <template #input>
          <van-uploader max-count="1" />
        </template>
      </van-field>
    </van-cell-group>
    
    <div style="margin: 20px 40px">
      <van-button loading-text="处理中..." round block type="primary">
        修改信息
      </van-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.form-box {
  margin-top: 30px;
}
</style>