import axios from "axios"
import { Message } from 'element-ui'
import _ from '@/assets/utils'

const http = axios.create({
    baseURL: '/api',
    timeout: 60000
})

// 对于除登录&获取验证码的接口外，其余所有接口请求，都需要基于请求头把Token传递给服务器
const exclude = ['/captchaImage', '/login']
http.interceptors.request.use(
    config => {
        const token = _.storage.get('TK')
        if (token && !exclude.includes(config.url)) {
            config.headers['Authorization'] = token
        }
        return config
    }
)

http.interceptors.response.use(
    response => {
        return response.data
    },
    reason => {
        Message.error('网络繁忙，稍后再试~')
        return Promise.reject(reason)
    }
)
export default http