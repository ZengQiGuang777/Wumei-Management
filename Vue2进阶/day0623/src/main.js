import 'core-js/stable'
import 'regenerator-runtime'

import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import { Button } from 'element-ui'

Vue.use(Button)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

/* 测试跨域代理 */
/* axios.get('/api/4/news/latest')
  .then(response => {
    console.log(response.data)
  })

axios.get('/book/subscriptions/recommended_collections')
  .then(response => {
    console.log(response.data)
  }) */