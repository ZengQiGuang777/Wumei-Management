import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Ant from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
//去除全局样式
import './styles/base.less'
Vue.use(Ant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
