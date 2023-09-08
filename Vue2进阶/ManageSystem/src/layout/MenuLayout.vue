<script>
export default {
    props: {
        collapsed: Boolean
    },
    computed: {
        /* 筛选出需要展示的二级/三级路由 */
        menuList() {
            // let routeList = this.$store.state?.rlist || [],
            let routeList = this.$router.getRoutes(),
                arr = []
            // 先筛选二级
            routeList.forEach(item => {
                let { path, name, meta: { title, icon, hidden, level } } = item
                if (+level === 2 && hidden) {
                    arr.push({
                        path,
                        name,
                        title,
                        icon,
                        children: []
                    })
                }
            })
            // 再筛选三级
            arr.forEach(({ name, children }) => {
                let reg = new RegExp(`^${name}_`, "i")
                routeList.forEach(item => {
                    let { path, name, meta: { title, icon, hidden, level, permission = '' } } = item
                    if (+level === 3 && reg.test(name) && hidden) {
                        children.push({
                            path,
                            name,
                            title,
                            icon,
                            permission
                        })
                    }
                })
            })
            return arr
        }
    }
}
</script>

<template>
    <el-menu router :collapse="collapsed" :default-active="$route.path" background-color="#304156" text-color="#fff"
        active-text-color="#409eff" :collapse-transition="false" :unique-opened="true">
        <el-menu-item index="/index/welcome">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu v-for="item in menuList" :key="item.name" :index="item.path">
            <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
            </template>
            <el-menu-item v-for="cur in item.children" :key="cur.name" :index="cur.path">
                <i :class="cur.icon"></i>
                <span slot="title">{{ cur.title }}</span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<style lang="less" scoped>
.el-menu {
    user-select: none;
    border-right: none;

    .el-icon-document {
        font-size: 18px;
    }
}
</style>