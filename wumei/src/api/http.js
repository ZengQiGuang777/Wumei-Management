//二次封装axios
import axios from "axios";
//引入弹窗模块
import { message } from "ant-design-vue";
import { Promise } from "core-js";
import _ from '@/assets/utils'

//登录和请求验证码的时候不需要传递token
const exclude = ['/captchaImage', '/login']

const http = axios.create({
    baseURL: '/api',
    timeout: 60000
})
//设置请求拦截器
http.interceptors.request.use(
    config => {
        const token = _.storage.get('TK')
        if (token && !exclude.includes(config.url)) {
            config.headers['Authorization'] = token
        }
        return config
    }
)

//设置响应拦截器
http.interceptors.response.use(
    response => {
        return response.data
    },
    reason => {
        message.error('网络繁忙，请稍后再试~')
        return Promise.reject(reason)
    }
)

/* 导出http */
export default http