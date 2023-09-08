import Vue from 'vue'
import './global'
import App from './App.vue'

let vm = new Vue({
  /* 各组件通用的信息 */
  data: {
    supNum: 10,
    oppNum: 5
  },
  methods: {
    change(type) {
      type === 'sup' ? this.supNum++ : this.oppNum++
    }
  },
  /* 正常渲染 */
  render: h => h(App)
}).$mount('#app')

/* 把修改公共信息的方法，追加到根实例的事件池中 */
vm.$on('AAA', vm.change)