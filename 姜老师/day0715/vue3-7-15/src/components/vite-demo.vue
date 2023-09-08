<script setup>
import colors from "./var.module.css"

// 发请求做代理， mock数据
fetch('/api/posts/1').then(res => res.json()).then(data => {
  console.log(data)
})
fetch('/api/get').then(res => res.json()).then(data => {
  console.log(data)
})
</script>
<template>
  <!-- webpack中想显示图片  file-loader url-loader -->
  <!-- alias -->
  <img src="@/assets//logo.svg" style="width: 100px; height: 100px" />
  <!-- css module  css模块（文件后缀必须module.css） -->
  <span :class="colors.gold"> 金色 </span>
  <span :class="colors.fire"> 红色 </span>
  <span class="tree"> 绿色 </span>
  <span class="solid"> 土色 </span>
  <div class="box"></div>

  <van-button>按钮</van-button>
  <van-field/>
</template>
<style scoped>
.box {
  width: 100px;
  height:100px;
  background: red;
  transform: rotate(45deg);
}
</style>

<style scoped lang="scss">
// 每个scss代码块中都会注入这个公共的倒入模式
.tree {
  color: $color;
}
</style>
<style scoped lang="less">
@color: #ccc;
.solid {
  color: @color;
}
</style>
