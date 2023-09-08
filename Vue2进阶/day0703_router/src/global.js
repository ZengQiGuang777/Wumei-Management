import Vue from "vue"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import API from "@/api"
import ButtonAgain from '@/components/ButtonAgain.vue'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$API = API

/* 注册全局组件 */
Vue.component(ButtonAgain.name, ButtonAgain)