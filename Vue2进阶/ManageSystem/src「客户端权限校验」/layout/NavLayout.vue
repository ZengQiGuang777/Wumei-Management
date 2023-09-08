<script>
import { mapState, mapMutations } from "vuex";
export default {
    computed: {
        ...mapState(['historyList'])
    },
    methods: {
        ...mapMutations(['removeHistoryList', 'addHistoryList']),
        // 基于事件委托，优化标签的点击操作
        handle(ev) {
            let target = ev.target,
                targetTag = target.tagName
            if (targetTag === 'SPAN') {
                // 点击标签
                let path = target.getAttribute('path')
                this.$router.push(path)
            }
        },
        // 关掉的操作
        handleClose({ name, path }) {
            this.removeHistoryList(name)
            if (path === this.$route.path) {
                // 移除这一项正好是当前选中的，则移除后，让其跳转到首页
                this.$router.push('/index/welcome')
            }
        }
    },
    watch: {
        // 监听路由切换：每一次切换，都新增访问的历史记录「也可以写在全局后置守卫中」
        $route: {
            deep: true,
            immediate: true,
            handler() {
                let { path, name, meta: { title, level, permission } } = this.$route
                if (+level === 3 && name !== 'index_welcome') {
                    this.addHistoryList({
                        title,
                        permission,
                        path,
                        name
                    })
                }
            }
        }
    }
}
</script>

<template>
    <div class="tablist-box" @click="handle">
        <el-tag path="/index/welcome" :type="$route.path === '/index/welcome' ? '' : 'info'">首页</el-tag>
        <el-tag v-for="item in historyList" :key="item.name" closable :path="item.path" @close="handleClose(item)"
            :type="item.path === $route.path ? `` : `info`" v-power="item.permission">
            {{ item.title }}
        </el-tag>
    </div>
</template>

<style lang="less" scoped>
.tablist-box {
    display: flex;
    align-items: center;
    height: 100%;

    .el-tag {
        margin-right: 10px;
        padding: 0 6px;
        height: 22px;
        line-height: 22px;
        cursor: pointer;
    }
}
</style>