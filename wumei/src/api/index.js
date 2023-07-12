import http from "./http"

//获取验证码
const queryCaptchaImage = () => http.get("/captchaImage")

//用户登录校验
const checkUserLogin = (body) => http.post('/login', body)

//获取登录者信息[含权限信息]
const queryUserProfile = () => http.get('/getInfo')

/* 暴露API */
const API = {
    queryCaptchaImage,
    checkUserLogin,
    queryUserProfile
}

export default API