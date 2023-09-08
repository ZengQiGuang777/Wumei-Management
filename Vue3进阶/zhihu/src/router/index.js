import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import useBaseStore from '@/stores/base'
import { showFailToast } from 'vant'
import showOverlayLoading from '@/components/overlay'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/* 全局前置守卫：登录态校验 */
const checkList = ['/person', '/store', '/update']
let hiddenOverlayLoading = null
router.beforeEach(async (to, from, next) => {
  let base = useBaseStore(),
    profile = base.profile
  // 除登录页之外，其余所有页面在没有存储登录者信息的情况下，都需要从服务器获取登陆者信息进行存储
  if (!profile && to.path !== '/login') {
    hiddenOverlayLoading = showOverlayLoading() //开启遮照层
    let info = await base.queryProfile()
    // 如果是需要登录态校验的三个页面，再进行登录校验和跳转
    if (checkList.includes(to.path) && !info) {
      showFailToast('您还未登录，请先登录')
      next({
        path: '/login',
        query: {
          target: to.fullPath
        }
      })
      hiddenOverlayLoading && hiddenOverlayLoading() //移除遮照层
      return
    }
  }
  next()
})

/* 全局后置守卫 */
router.afterEach(to => {
  hiddenOverlayLoading && hiddenOverlayLoading() //移除遮照层

  // 修改页面的标题
  let title = to.meta?.title
  document.title = !title ? '知乎日报' : `${title} - 知乎日报`
})

export default router
