import Vue from "vue"
import { Button, Tag, Loading, Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Button)
    .use(Tag)
    .use(Loading.directive)
Vue.prototype.$message = Message

Vue.config.productionTip = false

/* 创建自定义指令 */
Vue.directive('jinyu', {
    bind(el, binding, vnode) {
        console.log(el, binding, vnode)
    }
})