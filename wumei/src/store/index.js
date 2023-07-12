import Vue from 'vue'
import Vuex from 'vuex'
import API from '@/api'

Vue.use(Vuex)
//创建sotre容器
export default new Vuex.Store({
  state: {
    profile: null
  },
  getters: {
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile
    }
  },
  actions: {
    async setProfileAsync({ commit }) {
      let profile = null
      try {
           let{code,permissions,roles,user}=await API.queryUserProfile()
           if(+code===200){
            profile={
              permissions,
              roles,
              user
            }
             commit('setProfile',profile)
           }
      } catch (_) {

      }

      return profile
    }
  },
  modules: {
  }
})
