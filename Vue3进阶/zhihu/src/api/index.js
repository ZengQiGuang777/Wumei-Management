import http from './http'

// 获取最新的新闻信息
const queryNewsLatest = () => http.get('/news_latest')

// 获取以往的新闻信息
const queryNewsBefore = (time) => {
    return http.get('/news_before', {
        params: {
            time
        }
    })
}

// 获取新闻的详细信息
const queryNewsInfo = (id) => {
    return http.get('/news_info', {
        params: {
            id
        }
    })
}

// 获取新闻的点赞信息
const queryStoryExtra = (id) => {
    return http.get('/story_extra', {
        params: {
            id
        }
    })
}

// 用户登录
const userLogin = (phone, code) => {
    return http.post('/login', {
        phone,
        code
    })
}

// 发送验证码
const userSendCode = (phone) => {
    return http.post('/phone_code', {
        phone
    })
}

// 获取登录者信息
const userInfo = () => http.get('/user_info')

// 收藏新闻
const storeAdd = (newsId) => {
    return http.post('/store', {
        newsId
    })
}

// 移除收藏
const storeRemove = (id) => {
    return http.get('/store_remove', {
        params: {
            id
        }
    })
}

// 获取收藏列表
const storeList = () => http.get('/store_list')

/* 暴露API */
const API = {
    queryNewsLatest,
    queryNewsBefore,
    queryNewsInfo,
    queryStoryExtra,
    userLogin,
    userSendCode,
    userInfo,
    storeAdd,
    storeRemove,
    storeList
}
export default API
