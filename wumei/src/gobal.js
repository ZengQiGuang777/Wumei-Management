import Vue from 'vue';
import Ant from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import API from '@/api'



Vue.use(Ant);
Vue.config.productionTip = false
Vue.prototype.$API = API