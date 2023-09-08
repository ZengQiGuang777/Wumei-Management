import Vue from "vue"
import API from "./api"
import ButtonAgain from './components/ButtonAgain.vue'
import { Button, Loading, Message, Popconfirm, Input } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Button)
    .use(Popconfirm)
    .use(Input)
    .use(Loading.directive)
Vue.prototype.$message = Message
Vue.prototype.$API = API
Vue.config.productionTip = false

/* 注册全局组件 */
Vue.component(ButtonAgain.name, ButtonAgain)