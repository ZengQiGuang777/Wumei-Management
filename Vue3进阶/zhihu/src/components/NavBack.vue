<script setup>
import useAutoImport from '@/useAutoImport'
const { router, route } = useAutoImport()

const back = () => {
  // 特殊情况：当前是登录页，而且来源是详情页，需要基于replace的方式，回到详情页面
  if (route.path === '/login') {
    let target = route.query.target || ''
    if (/^\/detail\//.test(target)) {
      router.replace(target)
      return
    }
  }
  router.go(-1)
}
</script>

<template>
  <van-nav-bar title="个人中心" left-text="返回" left-arrow @click-left="back" />
</template>

<style lang="less" scoped>
:deep(.van-icon),
:deep(.van-nav-bar__text) {
  color: #000;
}
</style>