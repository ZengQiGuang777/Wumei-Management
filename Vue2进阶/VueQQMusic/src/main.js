import Vue from 'vue'
import App from './App.vue'
import API from './api'
/* REM */
import 'lib-flexible'
/* FastClick */
import FastClick from 'fastclick'
FastClick.attach(document.body)

Vue.prototype.$API = API
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')