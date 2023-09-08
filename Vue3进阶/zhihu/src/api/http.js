import axios from 'axios'
import qs from 'qs'
import { showNotify } from 'vant'
import { isPlainObject } from 'lodash'
import ut from '@/assets/utils'

const http = axios.create({
    baseURL: '/api',
    timeout: 60000,
    transformRequest: data => {
        if (isPlainObject(data)) return qs.stringify(data)
        return data
    }
})

const safeList = ['/store_list', '/store_remove', '/store', '/user_info']
http.interceptors.request.use(config => {
    if (safeList.includes(config.url)) {
        // 请求头携带Token
        const token = ut.storage.get('TK')
        if (token) {
            config.headers['authorization'] = token
        }
    }
    return config
})

http.interceptors.response.use(response => {
    return response.data
}, reason => {
    showNotify({
        type: 'danger',
        message: '网络繁忙，稍后再试！',
        duration: 2000
    })
    return Promise.reject(reason)
})
export default http
