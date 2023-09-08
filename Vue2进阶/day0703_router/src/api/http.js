import axios from "axios"
import { Message } from 'element-ui'

const http = axios.create({
    baseURL: '/api',
    timeout: 60000
})

http.interceptors.request.use(
    config => {
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