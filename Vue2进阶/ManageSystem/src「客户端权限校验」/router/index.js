import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes"
import store from "@/store"
import { Message, Loading, Notification } from 'element-ui'
Vue.use(VueRouter)

/* 解决跳转到相同路由后报错问题 */
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(...params) {
    let res = originPush.call(this, ...params)
    if (res instanceof Promise) {
        return res.catch(reason => reason)
    }
    return res
}

/* 创建路由管理 */
const router = new VueRouter({
    mode: 'hash',
    routes
})

/* 导航守卫 */
// 全局前置守卫：登录态的校验
let ignore = ['user_login', 'user', 'error']
let loadingIns = null
router.beforeEach(async (to, from, next) => {
    let profile = store.state.profile
    // 跳转的路由不是ignore中的 && vuex中没有存储登陆者信息，此时我们需要异步派发任务，实现登录态校验
    if (!ignore.includes(to.name) && !profile) {
        // 开启Loading
        if (!loadingIns) {
            loadingIns = Loading.service({
                text: '请稍后，奴家正在努力加载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
        }
        // 异步获取登陆者信息
        profile = await store.dispatch('setProfileAsync')
        if (!profile) {
            // 发送异步请求后，都没有获取登陆者信息，则说明当前用户就是没登录
            Message.warning('您还没有登录，请您先登录~')
            next({
                path: '/user/login',
                query: {
                    target: to.fullPath
                }
            })
            // 防止从登录页点击回退，因为没登录，则再跳转到登录页（两次地址一样，则不会触发afterEach）
            if (loadingIns) {
                loadingIns.close()
                loadingIns = null
            }
            return
        }
    }

    // 权限校验
    let permission = to.meta?.permission,
        permissions = profile?.permissions || []
    if (permission && !permissions.includes(permission)) {
        Notification({
            title: '权限警告',
            message: '您不具备此权限，请先联系管理员！',
            type: 'warning',
            duration: 2000
        })
        next(from.fullPath)
        // next({ name: 'error' })
        return
    }
    next()
})

// 全局后置守卫
router.afterEach((to, from) => {
    // 关闭Loading
    if (loadingIns) {
        loadingIns.close()
        loadingIns = null
    }

    // 修改页面的标题
    let { title } = to.meta
    document.title = title ? `${title} - 物联网管理系统` : `物联网管理系统`
})

export default router