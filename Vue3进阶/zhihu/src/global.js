import 'lib-flexible'
import { FastClick } from 'fastclick'
import { Lazyload } from 'vant'
import NewsItem from '@/components/NewsItem.vue'
import NavBack from '@/components/NavBack.vue'
import ButtonAgain from '@/components/ButtonAgain'
// vant@4中函数组件的样式
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'

export default function global(app) {
    // 解决 click 300ms 延迟问题
    FastClick.attach(document.body)

    // 注册全局组件
    app.component('NewsItem', NewsItem)
    app.component('NavBack', NavBack)
    app.component('ButtonAgain', ButtonAgain)
    app.use(Lazyload, { lazyComponent: true })

    // 注册全局属性/方法「类似于Vue2中，把信息放在 Vue.prototype，目的：在视图中可以直接使用这些信息、会挂载到组件的 this 上(Vue2)、可以基于 getCurrentInstance 获取实例后调用」
    // app.config.globalProperties.$toast = showToast
}
