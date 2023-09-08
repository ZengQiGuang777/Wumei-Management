<script setup>
import HomeHead from '@/components/HomeHead.vue'
import useAutoImport from '@/useAutoImport'
const { reactive, onBeforeMount, onMounted, onUnmounted, ref, dayjs, API } = useAutoImport()

/* 定义 OptionsAPI 配置项 */
defineOptions({
  name: 'Home'
})

/* 定义状态和数据 */
const moreBox = ref(null)
const state = reactive({
  today: dayjs().format('YYYYMMDD'),
  bannerData: [],
  newsList: []
})

/* 第一次渲染之前：向服务器发送数据请求 */
onBeforeMount(async () => {
  try {
    let { date, stories, top_stories } = await API.queryNewsLatest()
    state.today = date
    state.bannerData = Object.freeze(top_stories)
    state.newsList.push(
      Object.freeze({
        date,
        stories
      })
    )
  } catch (_) { }
})

/* 第一次渲染完毕：创建监听器，实现触底加载 */
let ob = null,
  isRun = false
onMounted(() => {
  ob = new IntersectionObserver(async changes => {
    let item = changes[0]
    if (!item.isIntersecting) return
    // 到达页面底部（触底）：获取以往的新闻数据
    if (isRun) return
    isRun = true
    try {
      let time = state.newsList[state.newsList.length - 1].date
      let data = await API.queryNewsBefore(time)
      state.newsList.push(
        Object.freeze(data)
      )
    } catch (_) { }
    isRun = false
  })
  ob.observe(moreBox.value)
})
onUnmounted(() => {
  // 组件销毁后：移除创建的监听器「此时 moreBox.value 真实DOM已经销毁」
  if (ob) ob = null
})
</script>

<template>
  <!-- 头部区域 -->
  <home-head :today="state.today" />

  <!-- 轮播图 -->
  <section class="banner-box">
    <van-swipe v-if="state.bannerData.length > 0" :autoplay="3000" lazy-render>
      <van-swipe-item v-for="item in state.bannerData" :key="item.id">
        <router-link :to="`/detail/${item.id}`">
          <img :src="item.image" alt="" class="pic" />
          <div class="desc">
            <h3 class="title">{{ item.title }}</h3>
            <p class="author">{{ item.hint }}</p>
          </div>
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </section>

  <!-- 新闻列表 -->
  <van-skeleton title :row="5" v-if="state.newsList.length === 0"></van-skeleton>
  <template v-else>
    <section class="news-box" v-for="(item, index) in state.newsList" :key="item.date">
      <van-divider content-position="left" v-if="index > 0">
        {{ dayjs(item.date).format('MM月DD日') }}
      </van-divider>
      <div class="content">
        <news-item v-for="cur in item.stories" :key="cur.id" :info="cur" from="home" />
      </div>
    </section>
  </template>

  <!-- 加载更多 -->
  <div class="lazy-more" ref="moreBox" v-show="state.newsList.length > 0">
    <van-loading size="12px">小主，精彩数据准备中...</van-loading>
  </div>
</template>

<style lang="less" scoped>
.banner-box {
  box-sizing: border-box;
  height: 375px;
  background: #eee;
  overflow: hidden;

  .van-swipe {
    height: 100%;

    a {
      display: block;
      height: 100%;
    }

    .pic {
      display: block;
      width: 100%;
      height: 100%;
    }

    .desc {
      position: absolute;
      bottom: 0;
      left: 0;
      box-sizing: border-box;
      padding: 20px;
      width: 100%;
      background: rgba(0, 0, 0, 0.5);
      background: -webkit-linear-gradient(top,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.5));

      .title {
        line-height: 25px;
        font-size: 20px;
        color: @CR_W;
      }

      .author {
        line-height: 30px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }

  :deep(.van-swipe__indicators) {
    left: auto;
    right: 20px;
    transform: none;

    .van-swipe__indicator--active {
      background-color: @CR_W;
      width: 18px;
      border-radius: 3px;
    }
  }
}

.news-box {
  padding: 0 15px;

  .van-divider {
    margin: 5px 0;
    font-size: 12px;

    &:before {
      display: none;
    }
  }
}

.van-skeleton {
  padding: 30px 15px;
}

.lazy-more {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10px;
  height: 50px;
  background: #f4f4f4;
}
</style>