import BasicLayout from '@/layout/BasicLayout.vue'
import UserLayout from '@/layout/UserLayout.vue'
import childRoutes from './childRoutes'

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
        redirect: '/index/welcome',
        children: childRoutes
    },
    {
        path: '*',
        name: 'error',
        meta: {
            title: '404页面',
            level: 1
        },
        component: () => import(/* webpackChunkName: "error" */ '@/views/ErrorPage.vue')
    }
]
export default routes