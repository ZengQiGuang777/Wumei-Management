
//配置二级路由
const iotRoutes = [
    {
        path: 'index',
        name: 'home_index',
        component: () => import(/* webpackChunkName:'index' */'@/views/index.vue'),
        meta: { title: '首页界面' },
    },
    {
        path: 'iot',
        name: 'iot',
        meta: { title: '设备管理' },
        component: () => import(/* webpackChunkName:'iot' */'@/views/Temp.vue'),
        redirect: '/home/iot/template',
        children: [
            {
                path: 'template',
                name: 'iot_template',
                meta: { title: '通用物模型' },
                component: () => import(/* webpackChunkName:'iot' */'@/views/iot/iot-template.vue')
            },
            {
                path: 'category',
                name: 'iot_category',
                meta: { title: '产品分类' },
                component: () => import(/* webpackChunkName:'iot' */'@/views/iot/iot-category.vue')
            },
            {
                path: 'product',
                name: 'iot_product',
                meta: { title: '产品管理' },
                component: () => import(/* webpackChunkName:'iot' */'@/views/iot/iot-product.vue')
            },
            {
                path: 'group',
                name: 'iot_group',
                meta: { title: '设备分组' },
                component: () => import(/* webpackChunkName:'iot' */'@/views/iot/iot-group.vue')
            },
            {
                path: 'device',
                name: 'iot_device',
                meta: { title: '设备管理' },
                component: () => import(/* webpackChunkName:'iot' */'@/views/iot/iot-device.vue')
            },
            {
                path: 'alertLog',
                name: 'iot_alertLog',
                meta: { title: '设备告警' },
                component: () => import(/* webpackChunkName:'iot' */'@/views/iot/iot-alertLog.vue')
            },
            {
                path: 'scene',
                name: 'iot_scene',
                meta: { title: '场景联动' },
                component: () => import(/* webpackChunkName:'iot' */'@/views/iot/iot-scene.vue')
            },
            {
                path: 'sip',
                name: 'iot_sip',
                meta: { title: '视频配置' },
                component: () => import(/* webpackChunkName:'iot' */'@/views/iot/iot-sip.vue')
            },
        ]
    },
]

//配置一级路由

const routes = [
    {
        path: '/',
        redirect: '/login/logOn'
    },
    {
        path: '/login',
        name: 'login',
        redirect: '/login/logOn',
        component: () => import(/* webpackChunkName:'login' */'@/views/login.vue'),
        children: [{
            path: 'logOn',
            name: 'login_logOn',
            component: () => import(/* webpackChunkName:'login' */'@/views/users/logOn.vue'),
        },
        {
            path: 'create',
            name: 'login_create',
            component: () => import(/* webpackChunkName:'login' */'@/views/users/create.vue'),
        },
        ]
    },
    {
        path: '/home',
        name: 'homePage',
        redirect: '/home/index',
        component: () => import(/* webpackChunkName:'login' */'@/views/home-page.vue'),
        children: iotRoutes
    },
    {
        path: '*',
        name: 'errorPage',
        component: () => import(/* webpackChunkName:'error' */'@/views/404.vue')
    },
]
export default routes


























/* 
// 获取原型对象push函数
const originalPush = VueRouter.prototype.push

// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace

// 修改原型对象中的push函数
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)   
}
 */