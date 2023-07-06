import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)
const router = new VueRouter({
  //指定路由模式
  mode: 'hash',
  base:'/',
  //指定路由表
  routes
})
//设置导航守卫
// router.beforeEach((to, from, next) => {
//   next()
// })
// router.afterEach((to, from)=>{

// })
export default router