import API from "@/api"
import store from "@/store"
import { Message, Loading } from 'element-ui'
import { cloneDeep } from 'lodash'

export default async function createRoute(router) {
    // 防止重复增加
    let routerList = router.getRoutes()
    if (routerList.some(item => item.name === 'error')) return
    // 开启Loading
    let loadingIns = Loading.service({
        text: '请稍后，奴家正在努力加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    // 发送请求获取数据
    try {
        let { code, data } = await API.queryRouter()
        if (+code === 200) {
            // 请求成功：动态增加路由信息
            data.forEach(item => {
                router.addRoute('home', item)
            })
            router.addRoute({
                path: '*',
                name: 'error',
                meta: {
                    title: '404页面',
                    level: 1
                },
                component: () => import(/* webpackChunkName: "error" */ '@/views/ErrorPage.vue')
            })
            // 动态路由新增完毕，同步vuex中的路由信息
            // console.log(router.getRoutes())
            // store.commit('setRList', cloneDeep(router.getRoutes()))
        } else {
            Message.error('动态数据加载失败，请刷新页面重试')
        }
    } catch (_) {
        console.log('动态路由错误：', _)
    }
    // 关闭Loading
    loadingIns.close()
}