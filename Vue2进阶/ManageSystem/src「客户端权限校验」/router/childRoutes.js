/* 渲染三级路由组件的RouterView */
const RouterViewPage = {
    name: 'RouterViewPage',
    render: (h) => {
        return <keep-alive include="IndexWelcome">
            <router-view />
        </keep-alive>
    }
}

// 首页的子集
const indexRoutes = [{
    path: 'welcome',
    name: 'index_welcome',
    meta: {
        title: '欢迎页',
        icon: 'el-icon-s-home',
        hidden: true,
        level: 3
    },
    component: () => import(/* webpackChunkName:'index' */ '@/views/index/Welcome.vue')
}, {
    path: 'personal',
    name: 'index_personal',
    meta: {
        title: '个人中心',
        icon: 'el-icon-user',
        hidden: false,
        level: 3
    },
    component: () => import(/* webpackChunkName:'index' */ '@/views/index/Personal.vue')
}, {
    path: 'setting',
    name: 'index_setting',
    meta: {
        title: '个人设置',
        icon: 'el-icon-setting',
        hidden: false,
        level: 3
    },
    component: () => import(/* webpackChunkName:'index' */ '@/views/index/Setting.vue')
}]

// 设备管理的子集
const iotRoutes = [{
    path: 'template',
    name: 'iot_template',
    meta: {
        title: '通用物模型',
        icon: 'el-icon-news',
        hidden: true,
        level: 3,
        permission: 'iot:template:list'
    },
    component: () => import(/* webpackChunkName:'iot' */'@/views/iot/Template.vue')
}, {
    path: 'category',
    name: 'iot_category',
    meta: {
        title: '产品分类',
        icon: 'el-icon-document-copy',
        hidden: true,
        level: 3,
        permission: 'iot:category:list'
    },
    component: () => import(/* webpackChunkName:'iot' */'@/views/iot/Category.vue')
}, {
    path: 'product',
    name: 'iot_product',
    meta: {
        title: '产品管理',
        icon: 'el-icon-pie-chart',
        hidden: true,
        level: 3,
        permission: 'iot:product:list'
    },
    component: () => import(/* webpackChunkName:'iot' */'@/views/iot/Product.vue')
}]

// 系统管理的子集
const systemRoutes = [{
    path: 'user',
    name: 'system_user',
    meta: {
        title: '用户管理',
        icon: 'el-icon-user',
        hidden: true,
        level: 3,
        permission: 'system:user:query'
    },
    component: () => import(/* webpackChunkName:'system' */'@/views/system/User.vue')
}, {
    path: 'menu',
    name: 'system_menu',
    meta: {
        title: '菜单管理',
        icon: 'el-icon-postcard',
        hidden: true,
        level: 3,
        permission: 'system:menu:query'
    },
    component: () => import(/* webpackChunkName:'system' */'@/views/system/Menu.vue')
}]

/* 二级路由 */
const childRoutes = [
    // 首页
    {
        path: '/index',
        name: 'index',
        meta: {
            title: '首页',
            icon: '',
            hidden: false,
            level: 2
        },
        component: RouterViewPage,
        redirect: '/index/welcome',
        children: indexRoutes
    },
    // 设备管理
    {
        path: '/iot',
        name: 'iot',
        meta: {
            title: '设备管理',
            icon: 'el-icon-printer',
            hidden: true,
            level: 2
        },
        component: RouterViewPage,
        redirect: '/iot/template',
        children: iotRoutes
    },
    // 系统管理
    {
        path: '/system',
        name: 'system',
        meta: {
            title: '系统管理',
            icon: 'el-icon-setting',
            hidden: true,
            level: 2
        },
        component: RouterViewPage,
        redirect: '/system/user',
        children: systemRoutes
    }
]
export default childRoutes