import Vue from "vue"
import API from "./api"
import 'lib-flexible'
import FastClick from 'fastclick'
import { Button, Loading, Message, Popconfirm, Input } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ButtonAgain from '@/components/ButtonAgain.vue'
import Toast from '@/components/Toast.vue'

/* 移动端300ms延迟 */
FastClick.attach(document.body)

/* 组件库按需导入 */
Vue.use(Button)
    .use(Popconfirm)
    .use(Input)
    .use(Loading.directive)
Vue.prototype.$message = Message

/* 全局的一些配置 */
Vue.prototype.$API = API
Vue.config.productionTip = false

/* 注册全局组件 */
Vue.component(ButtonAgain.name, ButtonAgain)

/* 
基于函数执行渲染组件 
  const ToastCtor = Vue.extend(Toast)
    + extend中传递的是 OptionsAPI（或导入的组件）
    + Vue.extend是创建Vue类的一个子类「VueComponent 指定组件的类」
    + 后期就可以基于 new ToastCtor 创建组件类(也就是Vue子类)的实例「也属于Vue类的实例」=>> 动态渲染组件
*/
const ToastCtor = Vue.extend(Toast)
Vue.prototype.$toast = function $toast(text = '', time = 2000) {
    // NEW：只是创建实例，挂载一些数据
    let vm = new ToastCtor({
        // 动态渲染组件，给组件传递属性
        propsData: {
            text,
            time
        }
    })
    // $mount：视图进行渲染(视图->虚拟DOM->真实DOM)「vm.$el」，但是如果不指定容器，渲染的真实DOM无法出现在页面中（如果指定容器，那么当前渲染的内容会覆盖整个容器）
    vm.$mount()
    // 把渲染后的真实DOM =>> vm.$el，插入到指定的容器中
    document.body.appendChild(vm.$el)
}