/* 构建路由表 */
import HomePage from '@/views/HomePage.vue'

// 个人中心的二级路由
const personalRoutes = [{
    path: 'order', //等价于 /personal/order 「但是不要加 /」
    name: 'personal_order',
    meta: { title: '我的订单' },
    component: () => import(/* webpackChunkName:'personal' */ '@/views/personal/MyOrder.vue')
}, {
    path: 'profile/:lx?/:name?',
    name: 'personal_profile',
    meta: { title: '我的信息' },
    component: () => import(/* webpackChunkName:'personal' */ '@/views/personal/MyProfile.vue')
}]


// 一级路由
const routes = [
    {
        path: '/',
        name: 'home',
        meta: { title: '首页' },
        component: HomePage
    },
    {
        path: '/product',
        name: 'product',
        meta: { title: '产品中心' },
        beforeEnter(to, from, next) {
            console.log('产品中心-路由独享守卫：beforeEnter')
            next()
        },
        component: () => import(/* webpackChunkName:'product' */ '@/views/ProductionPage.vue')
    },
    {
        path: '/personal',
        name: 'personal',
        meta: { title: '个人中心' },
        component: () => import(/* webpackChunkName:'personal' */ '@/views/PersonalPage.vue'),
        redirect: '/personal/order',
        children: personalRoutes
    },
    {
        path: '*',
        name: 'error',
        meta: { title: '404错误页面' },
        component: () => import(/* webpackChunkName:'error' */ '@/views/ErrorPage.vue')
    }
]
export default routes