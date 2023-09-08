import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(router)
app.mount('#app')

// import { createRenderer,h} from 'vue'
// const vnode = h('div', 'hello')
// render(vnode, app); // 这个render方法，createElemet()  el.textContent = 'hello'
// // appendChild

// const { render}  = createRenderer({
//     // 创建一个元素
//     createElement(type) {
//         if (type === 'div') {
//             return document.createElement('p')
//         }
//     },
//     setElementText(el,text) {
//         el.textContent = text;
//     },
//     insert(el,parent) {
//         parent.appendChild(el);
//     }
//     // 给元素设置属性,方法
//     // 给元素设置内容
// })
// const vnode = h('div', 'hello')
// render(vnode, app)