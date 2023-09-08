import http from "./http"

// 模拟从服务器获取数据
const query = (interval = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                code: 0,
                message: 'OK'
            })
        }, interval)
    })
}

// 获取知乎日报的数据
const queryNewsLatest = () => http.get('/news/latest')

// 获取新闻详细信息
const queryNewsInfo = (id) => http.get(`/news/${id}`)


/* 暴露API */
const API = {
    query,
    queryNewsLatest,
    queryNewsInfo
}
export default API