<script setup>
/* 注册接收属性 */
defineProps({
  info: Object,
  from: String
})
</script>

<template>
  <div class="news-item" v-if="info">
    <router-link :to="`/detail/${info.id}`">
      <div class="img-box">
        <van-image :src="info.images?.[0]" alt="" lazy-load />
      </div>
      <h4 class="title">{{ info.title }}</h4>
      <p class="desc" v-if="from !== 'store'">{{ info.hint }}</p>
    </router-link>
  </div>
</template>

<style lang="less" scoped>
.news-item {
  box-sizing: border-box;
  position: relative;
  padding: 15px 0;
  height: 95px;
  overflow: hidden;

  a {
    display: block;

    &:visited {
      .title {
        color: #666;
      }

      .desc {
        color: #ccc;
      }
    }

    .title {
      margin-right: 75px;
      max-height: 50px;
      line-height: 25px;
      font-size: 16px;
      color: #000;
      overflow: hidden;
    }

    .desc {
      margin-right: 75px;
      line-height: 15px;
      font-size: 12px;
      color: #999;
    }
  }

  .img-box {
    position: absolute;
    right: 0;
    top: 15px;
    width: 65px;
    height: 65px;
    background: #d5d5d5;

    .van-image,
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>