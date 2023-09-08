

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { installVant } from './installVant'
// new Vue 不在使用了，而使用createApp来创建应用
// 不在有Vue构造函数的概念了  Vue.prototype , 我们还是希望可以声明一些属性在组件中直接使用
const app = createApp(App)
// app.config.errorHandler = (err, instance, info) => {
//     // 处理错误，例如：报告给一个服务, 开发者可以拿到错误信息定位到异常
//     console.log(err)
// }
installVant(app)
// 以前的Vue写法 都改成app.xxx
app.use(router)
app.mount('#app')





