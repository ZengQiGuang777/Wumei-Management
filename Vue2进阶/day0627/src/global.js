import Vue from "vue"
import { Button, Tag, Loading, Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Button)
    .use(Tag)
    .use(Loading.directive)
Vue.prototype.$message = Message

// 取消生产环境下的Vue提示信息
Vue.config.productionTip = false


/*
 Vue.use 是Vue2中使用/注册插件的方式 
   可以传递对象或者函数
   + 对象：要求对象必须具备 install 成员，成员值是一个函数，当Vue.use处理的时候，会自动执行 install 方法，并且把 Vue 传递进去！
   + 函数：函数本身就是 install 方法，会被触发执行，传递 Vue ！

    Vue.use(function install(_Vue) {
        console.log(_Vue, _Vue === Vue)
    })
    Vue.use({
        install(_Vue) {
            console.log(_Vue, _Vue === Vue)
        }
    })
 */