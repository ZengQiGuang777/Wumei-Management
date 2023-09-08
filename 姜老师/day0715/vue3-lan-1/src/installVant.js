import { showToast } from 'vant';
import { showDialog } from 'vant';
import { showNotify } from 'vant';
import { showImagePreview } from 'vant';

import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';
export function installVant(app) {
    // Vue.prototype 等价于 app.config.globalProperties.$showToast

    // app.component()
    // app.use() 使用插件
    // app.directive() 全局指令
    app.config.globalProperties.$showToast = showToast
    app.config.globalProperties.$showDialog = showDialog
    app.config.globalProperties.$showNotify = showNotify
    app.config.globalProperties.$showImagePreview = showImagePreview
}