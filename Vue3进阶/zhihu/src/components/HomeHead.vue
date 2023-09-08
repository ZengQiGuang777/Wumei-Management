<script setup>
import { computed } from 'vue'
import timg from '@/assets/images/timg.jpg'
import useBaseStore from '@/stores/base'
const base = useBaseStore()

/* 注册接收属性 */
const props = defineProps({
  today: String
})

/* 处理计算属性 */
const time = computed(() => {
  let { today } = props,
    [, month = '00', day = '00'] = today.match(/^\d{4}(\d{2})(\d{2})$/) || []
  let area = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
  return {
    day,
    month: area[+month]
  }
})
const picture = computed(() => {
  let profile = base.profile
  return profile ? profile.pic : timg
})

</script>

<template>
  <header class="header-box">
    <div class="text">
      <div class="time">
        <span>{{ time.day }}</span>
        <span>{{ time.month }}月</span>
      </div>
      <h2 class="title">知乎日报</h2>
    </div>
    <div class="picture">
      <router-link to="/person">
        <img :src="picture" alt="" class="logo" />
      </router-link>
    </div>
  </header>
</template>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;

  .picture {
    box-sizing: border-box;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    overflow: hidden;

    a {
      display: block;
      height: 100%;

      .logo {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }

  .text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 34px;

    .title {
      padding-left: 20px;
      line-height: 68px;
      font-size: 44px;
      border-left: 1px solid #ddd;
      transform: scale(0.5);
      transform-origin: left;
    }

    .time {
      box-sizing: border-box;
      padding-right: 15px;

      span {
        display: block;
        line-height: 20px;
        font-size: 20px;
        text-align: center;

        &:nth-last-child(1) {
          line-height: 14px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>