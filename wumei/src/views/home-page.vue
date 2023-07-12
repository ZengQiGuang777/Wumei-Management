<template>
    <a-layout id="container">
        <!-- 侧边栏 -->
        <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="container-slide">
            <div class="logo">
                <img src="../assets/login.gif" alt="">
                <span v-if="!collapsed">FastBee</span>
            </div>
            <homePageSlidebottom />
        </a-layout-sider>
        <!-- 右边部分 -->
        <a-layout>
            <!-- 顶部 -->
            <a-layout-header style="background: #fff; padding: 0" class="tigerTotal">
                <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="() => (collapsed = !collapsed)" />
                <div class="triggerRight">
                    <div class="triggerRight-left">
                        首页
                    </div>
                    <div class="triggerRight-right">
                        <div class="triggerRight-right-serach">
                            111
                        </div>
                        <div class="triggerRight-right-icon">
                            <a-icon type="fullscreen" />
                            <a-icon type="github" />
                            <a-icon type="question-circle" />
                            <a-dropdown>
                                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                                    <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    <a-icon type="down" />
                                </a>
                                <a-menu slot="overlay">
                                    <a-menu-item>
                                        <a href="javascript:;">个人中心</a>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a href="javascript:;">布局设置</a>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a href="javascript:;">退出登录</a>
                                    </a-menu-item>
                                </a-menu>
                            </a-dropdown>
                        </div>
                    </div>
                </div>
            </a-layout-header>
            <!-- 面包屑 -->
            <BreadCrumbs />
            <!-- 内容部分 -->
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
                <!-- 路由出口 -->
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
import HomePageSlidebottom from './home-page-slidebottom.vue';
import BreadCrumbs from '@/layout/Bread-crumbs.vue'
export default {
    components: {
        HomePageSlidebottom,
        BreadCrumbs
    },
    data() {
        return {
            collapsed: false,
        };
    },
    methods: {
        handleMenuClick(e) {
            console.log('click', e);
        },
    },
};
</script>
<style lang="less" scoped>
#container {
    height: 100vh;
}

.tigerTotal {
    display: flex;
    justify-content: space-between;

    .triggerRight {
        flex: 1;
        display: flex;
        justify-content: space-between;

        .triggerRight-right {
            margin-right: 15px;
            display: flex;
            justify-content: space-between;

            .triggerRight-right-icon {
                width: 150px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                font-size: 20px;
            }
        }

    }
}

#container .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

#container .trigger:hover {
    color: #1890ff;
}

#container .logo {
    height: 32px;
    margin: 16px;
    display: flex;

    img {
        margin: 0 6px;
        width: 32px;
        height: 32px;
    }

    span {
        margin-left: 2px;
        line-height: 32px;
        font-size: 20px;
        font-family: 微软雅黑;
        color: #fff;
    }

}
</style>
