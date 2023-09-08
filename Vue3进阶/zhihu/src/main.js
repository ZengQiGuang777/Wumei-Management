import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import createPersistedState from 'pinia-plugin-persistedstate'
import global from './global'

// pinia持久化存储
const pinia = createPinia()
pinia.use(createPersistedState)

// 创建应用
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(global)
app.mount('#app')