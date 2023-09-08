import http from "./http"
import iot from "./iot"
import queryRouter from "./queryRouter"

// 获取验证码
const queryCaptchaImage = () => http.get('/captchaImage')

// 用户登录校验
const checkUserLogin = (body) => http.post('/login', body)

// 获取登录者信息「含权限信息」
const queryUserProfile = () => http.get('/getInfo')

// 获取地图标注数据
const queryDeviceAll = () => http.get('/iot/device/all')

// 获取新闻列表的数据
const queryNoticeList = (pageNum = 1, pageSize = 6) => {
    return http.get('/system/notice/list', {
        params: {
            pageNum,
            pageSize
        }
    })
}

// 获取设备统计的数据
const queryDeviceStatistic = () => http.get('/iot/device/statistic')

// 获取饼状图需要的数据
const queryMonitorServer = () => http.get('/monitor/server')

// 获取Mqtt统计数据
const queryBashBoardStats = () => http.get('/bashBoard/stats')

// 图片上传
const uploadImage = file => {
    let fm = new FormData()
    fm.append('file', file)
    return http.post('/iot/tool/upload', fm)
}


/* 暴露API */
const API = {
    iot,
    queryRouter,
    uploadImage,
    queryCaptchaImage,
    checkUserLogin,
    queryUserProfile,
    queryDeviceAll,
    queryNoticeList,
    queryDeviceStatistic,
    queryMonitorServer,
    queryBashBoardStats
}
export default API