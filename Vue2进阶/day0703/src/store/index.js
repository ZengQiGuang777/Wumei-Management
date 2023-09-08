import Vue from "vue"
import Vuex, { createLogger } from "vuex"
import API from "@/api"
Vue.use(Vuex)

/* 插件的管理 */
const env = process.env.NODE_ENV,
    plugins = []
if (env !== 'production') {
    plugins.push(
        createLogger()
    )
}

/* 创建STORE容器 */
const store = new Vuex.Store({
    plugins,
    strict: true, // 以后修改公共状态值，只能基于mutations中的方法修改，基于别的操作修改，则直接报错
    state: {
        supNum: 10,
        oppNum: 5
    },
    getters: {
        ratio(state) {
            let { supNum, oppNum } = state,
                total = supNum + oppNum
            return total === 0 ? '--' : (supNum / total * 100).toFixed(2) + '%'
        }
    },
    mutations: {
        changeNum(state, { isSup = true, step = 1 }) {
            isSup ? state.supNum += step : state.oppNum += step
        }
    },
    actions: {
        // context:{ state,gettters,disptach,commit } 简易版的store
        async changeNumAsync({ commit }, { isSup = true, step = 1 }) {
            try {
                await API.query(2000)
                // 通知mutations中的方法修改公共状态
                commit('changeNum', {
                    isSup,
                    step
                })
            } catch (_) { }
        }
    },
    modules: {}
})
export default store