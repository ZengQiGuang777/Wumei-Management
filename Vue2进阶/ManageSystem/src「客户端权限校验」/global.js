import Vue from "vue"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import API from "@/api"
import permission from "./permission"
import ButtonAgain from '@/components/ButtonAgain.vue'
import DrawPieImage from '@/components/DrawPieImage.vue'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(ElementUI)
Vue.use(VueQuillEditor, {
    placeholder: '请输入正文信息'
})
Vue.use(permission)
Vue.prototype.$API = API
Vue.config.productionTip = false

/* 全局混入的方法 */
Vue.mixin({
    methods: {
        mixinPrefixAdd(url, prefix = 'https://iot.fastbee.cn/prod-api') {
            let reg = /^http(s)?:\/\//
            return reg.test(url) ? url : prefix + url
        }
    }
})

/* 注册全局组件 */
Vue.component(ButtonAgain.name, ButtonAgain)
Vue.component(DrawPieImage.name, DrawPieImage)