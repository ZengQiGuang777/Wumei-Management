<script setup>
import NavBack from "@/components/NavBack.vue"
import NewsItem from "@/components/NewsItem.vue"
</script>

<template>
  <nav-back title="我的收藏" />
  <van-empty description="暂无收藏" />
  <template v-if="true">
    <van-swipe-cell>
      <div class="con">
        <news-item />
      </div>
      <template #right>
        <van-button square type="danger" text="删除" />
      </template>
    </van-swipe-cell>
  </template>
</template>

<style lang="less" scoped>
.van-swipe-cell {
  .con {
    padding: 0 15px;
  }

  :deep(.van-swipe-cell__right) {
    .van-button {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>