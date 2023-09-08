import Vue from "vue"
import Vuex, { createLogger } from "vuex"
import VuexPersistence from 'vuex-persist'
import API from "@/api"
Vue.use(Vuex)

/* 配置插件 */
const vuexLocal = new VuexPersistence({
    key: 'vuex',
    storage: window.localStorage,
    reducer(state) {
        // 指定部分vuex状态持久化存储
        return {
            historyList: state.historyList
        }
    }
})
const env = process.env.NODE_ENV,
    plugins = [vuexLocal.plugin]
if (env === 'development') plugins.push(createLogger())

/* 创建store容器 */
const store = new Vuex.Store({
    strict: true,
    plugins,
    state: {
        // 登录者信息
        profile: null,
        // 访问的历史记录
        historyList: []
    },
    mutations: {
        // 同步修改登录者信息
        setProfile(state, profile) {
            state.profile = profile
        },
        // 同步新增历史记录
        addHistoryList(state, { title, path, name, permission }) {
            let unique = state.historyList.some(item => item.name === name)
            if (unique) return
            state.historyList.push({
                title,
                path,
                name,
                permission
            })
        },
        // 同步删除历史记录
        removeHistoryList(state, name) {
            state.historyList = state.historyList.filter(item => {
                return item.name !== name
            })
        }
    },
    actions: {
        async setProfileAsync({ commit }) {
            let profile = null
            try {
                let { code, permissions, roles, user } = await API.queryUserProfile()
                if (+code === 200) {
                    permissions = permissions.filter(item => item !== 'system:menu:query') //模拟没有权限的情况
                    profile = {
                        permissions,
                        roles,
                        user
                    }
                    commit('setProfile', profile)
                }
            } catch (_) { }
            return profile
        }
    },
    modules: {

    }
})
export default store