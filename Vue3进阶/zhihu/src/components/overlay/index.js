import { createVNode, render } from 'vue'
import Index from './Index.vue'

/* 显示带Loading的遮着层 */
export default function showOverlayLoading() {
    // 创建虚拟DOM 
    const vnode = createVNode(Index)
    // 渲染虚拟DOM
    const frag = document.createDocumentFragment()
    render(vnode, frag)
    // 把真实DOM插入到页面中
    document.body.appendChild(vnode.el)

    /* 移除渲染的遮罩层 */
    return function hiddenOverlayLoading() {
        if (vnode.el) {
            try {
                document.body.removeChild(vnode.el)
            } catch (_) { }
        }
    }
}