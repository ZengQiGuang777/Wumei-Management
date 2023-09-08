import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes"
Vue.use(VueRouter)

/* 创建ROUTER */
const router = new VueRouter({
    // 指定路由模式：hash(默认)、history、abstract(memory) 
    mode: 'hash',
    // 指定路由表
    routes
})

/* 导航守卫 */
router.beforeEach((to, from, next) => {
    console.log('全局前置守卫：beforeEach', to, from)
    // 一定要执行next方法，继续下一步
    // next('/personal') //直接跳转到 ‘/personal’
    next()
})

router.beforeResolve((to, from, next) => {
    console.log('全局解析守卫：beforeResolve')
    next()
})

router.afterEach((to, from) => {
    console.log('全局后置守卫：afterEach')
})

export default router