<script>
import { mapState, mapMutations } from 'vuex'
import NavLayout from './NavLayout.vue'
import ut from '@/assets/utils'

export default {
    components: {
        NavLayout
    },
    props: {
        collapsed: Boolean
    },
    computed: {
        // 把vuex中的部分公共状态获取使用
        ...mapState(['profile']),
        // 获取面包屑导航的数据
        breadcrumbList() {
            let route = this.$route,
                routeList = this.$router.getRoutes()
            let arr = [],
                match = routeList.find(item => item.path === route.path)
            while (match) {
                let { path, meta: { title } } = match
                if (title) {
                    arr.unshift({
                        path,
                        title
                    })
                }
                match = match.parent
            }
            return arr
        }
    },
    methods: {
        ...mapMutations(['setProfile']),
        handleCommand(command) {
            if (command === 'logout') {
                // 退出登录：清除Token、清除登录者信息、提示、跳转
                ut.storage.remove('TK')
                this.setProfile(null)
                // ...
                this.$message.success('您已安全退出')
                this.$router.replace({
                    path: '/user/login',
                    query: {
                        target: this.$route.fullPath
                    }
                })
                return
            }
            // 路由跳转
            this.$router.push(command)
        },
        // 强制更新：清除部分本地存储信息&强制刷新
        refresh() {
            ['cache_iot_things_type', 'cache_iot_data_type'].forEach(key => {
                localStorage.removeItem(key)
            })
            location.reload()
        }
    }
}
</script>

<template>
    <header class="header-layout">
        <div class="content">
            <div class="left">
                <i class="el-icon-s-unfold" @click="$emit('update:collapsed', false)" v-if="collapsed"></i>
                <i class="el-icon-s-fold" @click="$emit('update:collapsed', true)" v-else></i>
                <el-breadcrumb>
                    <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="item.path">
                        {{ item.title }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="right">
                <el-tooltip content="清空全部缓存及强制刷新">
                    <i class="el-icon-refresh" @click="refresh"></i>
                </el-tooltip>

                <el-dropdown @command="handleCommand" v-if="profile">
                    <span class="account-avatar">
                        <el-avatar :src="mixinPrefixAdd(profile.user.avatar)" />
                        <span>{{ profile.user.nickName }}</span>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="/index/personal" icon="el-icon-user">
                            个人中心
                        </el-dropdown-item>
                        <el-dropdown-item command="/index/setting" icon="el-icon-setting">
                            个人设置
                        </el-dropdown-item>
                        <el-dropdown-item command="logout" icon="el-icon-position" divided>
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="nav scrollActive">
            <NavLayout />
        </div>
    </header>
</template>

<style lang="less" scoped>
.header-layout {
    padding: 0;
    height: 80px;
    background-color: #FFF;

    .content,
    .nav {
        box-sizing: border-box;
        overflow: hidden;
    }

    .content {
        padding: 0 15px;
        height: 50px;
        line-height: 50px;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
            display: flex;
            align-items: center;

            .el-icon-s-fold,
            .el-icon-s-unfold {
                font-size: 18px;
                margin-right: 20px;
            }
        }

        .right {
            display: flex;
            align-items: center;

            .el-tooltip {
                font-size: 25px;
                margin-right: 15px;
                cursor: pointer;
            }

            .account-avatar {
                display: flex;
                align-items: center;

                .el-avatar {
                    margin-right: 5px;
                    width: 30px;
                    height: 30px;
                }

                :deep(.el-avatar--circle) {
                    border-radius: 50% !important;
                }

                span {
                    max-width: 132px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
            }
        }
    }

    .nav {
        margin: 0 15px;
        padding-top: 2px;
        height: 30px;
        overflow-x: auto;
    }
}
</style>