<script setup>
import useAutoImport from '@/useAutoImport'
import useBaseStore from '@/stores/base'
import useCollectStore from '@/stores/collect'
const {
  reactive, onBeforeMount, onUnmounted, nextTick, computed,
  router, route, API, showFailToast
} = useAutoImport()
const base = useBaseStore(),
  collect = useCollectStore()

/* 定义状态 */
const newsId = route.params.id
const state = reactive({
  info: null,
  extra: null
})

/* 第一次渲染之前：从服务器获取新闻详情和额外的信息 */
let link = null
const handleInfoStyle = () => {
  let css = state.info?.css?.[0]
  if (!css) return
  link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = css
  document.head.appendChild(link)
}
const handleHeaderImage = () => {
  const holderBox = document.querySelector('.img-place-holder')
  if (!holderBox) return
  const imgTemp = new Image()
  imgTemp.src = state.info.image
  imgTemp.onload = () => holderBox.appendChild(imgTemp)
  imgTemp.onerror = () => {
    const p = holderBox.parentNode
    p.parentNode.removeChild(p)
  }
}
onBeforeMount(async () => {
  try {
    let data = await API.queryNewsInfo(newsId)
    state.info = Object.freeze(data)
    // 处理样式：无需等待视图更新完毕
    handleInfoStyle()
    // 处理头图：需要等待组件更新完毕
    nextTick(handleHeaderImage)
  } catch (_) { }
})
onBeforeMount(async () => {
  try {
    let data = await API.queryStoryExtra(newsId)
    state.extra = Object.freeze(data)
  } catch (_) { }
})

/* 组件销毁后：把创建的样式移除掉 */
onUnmounted(() => {
  if (link) document.head.removeChild(link)
})

//==========================
// 第一次渲染页面之前：如果用户登录了，且没有收藏记录，则需要获取
onBeforeMount(() => {
  if (base.profile && !collect.collectList) {
    collect.queryCollectList()
  }
})

// 根据收藏记录，来计算此文章用户是否收藏过
const collectItem = computed(() => {
  let collectList = collect.collectList || []
  return collectList.find(item => {
    return String(item.news.id) === String(newsId)
  })
})

// 收藏的相关操作
const handleCollect = () => {
  if (!base.profile) {
    showFailToast('请您先登录')
    router.replace({
      path: '/login',
      query: {
        target: route.fullPath
      }
    })
    return
  }
  if (collectItem.value) {
    // 当前是已收藏：则移除收藏
    collect.removeCollectList(collectItem.value.id)
    return
  }
  // 当前是未收藏：则进行收藏
  collect.insertCollectList(newsId)
}

</script>

<template>
  <van-skeleton title :row="5" v-if="!state.info" />
  <div class="contentMy" v-else v-html="state.info.body"></div>

  <div class="nav-box">
    <van-icon name="arrow-left" @click="router.go(-1)"></van-icon>
    <template v-if="state.extra">
      <van-icon name="comment-o" :badge="state.extra.comments"></van-icon>
      <van-icon name="good-job-o" :badge="state.extra.popularity"></van-icon>
      <van-icon name="star-o" :color="collectItem ? `#1989fa` : ``" @click="handleCollect"></van-icon>
      <van-icon name="share-o" color="#ccc"></van-icon>
    </template>
  </div>
</template>

<style lang="less" scoped>
.contentMy {
  background: @CR_W;
  padding-bottom: 50px;
  margin: 0;

  :deep(.img-place-holder) {
    height: 375px;
    overflow: hidden;

    img {
      display: block;
      margin: 0;
      width: 100%;
      min-height: 100%;
    }
  }
}

.van-skeleton {
  padding: 30px 15px;
}

.nav-box {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 15px;
  width: 100%;
  height: 50px;
  background: #f4f4f4;
  font-size: 22px;

  .van-icon:nth-child(1) {
    position: relative;

    &::after {
      position: absolute;
      top: -10%;
      right: -15px;
      content: "";
      width: 1px;
      height: 120%;
      background: #d5d5d5;
    }
  }

  :deep(.van-badge) {
    background-color: transparent;
    border: none;
    color: #000;
    right: -5px;
  }
}
</style>