import Vue from "vue"
import { Button, Tag, Loading, Message, Popconfirm, Input } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Button)
    .use(Tag)
    .use(Popconfirm)
    .use(Input)
    .use(Loading.directive)
Vue.prototype.$message = Message

Vue.config.productionTip = false