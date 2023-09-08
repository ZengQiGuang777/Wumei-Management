import Home from '@/views/Home.vue'
const routes = [{
    path: '/',
    name: 'home',
    meta: { title: '首页' },
    component: Home
}, {
    path: '/detail/:id',
    name: 'detail',
    meta: { title: '详情页' },
    component: () => import('@/views/Detail.vue')
}, {
    path: '/login',
    name: 'login',
    meta: { title: '登录/注册页' },
    component: () => import('@/views/Login.vue')
}, {
    path: '/person',
    name: 'person',
    meta: { title: '个人中心' },
    component: () => import('@/views/Person.vue')
}, {
    path: '/store',
    name: 'store',
    meta: { title: '我的收藏' },
    component: () => import('@/views/Store.vue')
}, {
    path: '/update',
    name: 'update',
    meta: { title: '更改信息' },
    component: () => import('@/views/Update.vue')
}, {
    path: '/:pathMatch(.*)*',
    redirect: '/'
}]
export default routes
