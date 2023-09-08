import store from "./store"
import { Notification } from 'element-ui'

/* 不论是否具备权限，都先渲染出来，只不过操作的时候再校验权限 */
const $handlePermiseCheck = function $handlePermiseCheck(checkFlag) {
    let permissions = store.state?.profile?.permissions || []
    if (permissions.includes(checkFlag)) return Promise.resolve('')
    // 没有权限
    Notification({
        title: '权限警告',
        message: '您不具备此操作权限，请先联系管理员！',
        type: 'warning',
        duration: 2000
    })
    return Promise.reject('')
}

/* 具备权限再渲染出来，不具备权限的不渲染 */
const inserted = function inserted(el, { value }) {
    let permissions = store.state?.profile?.permissions || []
    if (!permissions.includes(value)) {
        // 登录者不具备需要校验的权限：把渲染的真实DOM移除
        el.parentNode.removeChild(el)
    }
}

let Vue
const install = function install(_Vue) {
    if (Vue === _Vue) return
    Vue = _Vue

    Vue.prototype.$handlePermiseCheck = $handlePermiseCheck
    Vue.directive('power', { inserted })
}

const permission = {
    install
}
export default permission