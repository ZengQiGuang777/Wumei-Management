import BasicLayout from '@/layout/BasicLayout.vue'
import UserLayout from '@/layout/UserLayout.vue'

/* 基础路由 */
const routes = [
    {
        path: '/user',
        name: 'user',
        meta: {
            title: '',
            level: 1
        },
        component: UserLayout,
        redirect: '/user/login',
        children: [{
            path: 'login',
            name: 'user_login',
            meta: {
                title: '用户登录',
                level: 2
            },
            component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login.vue')
        }]
    },
    {
        path: '/',
        name: 'home',
        meta: {
            title: '',
            level: 1
        },
        component: BasicLayout,
        redirect: '/index/welcome'
    }
]
export default routes