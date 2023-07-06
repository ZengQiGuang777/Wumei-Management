import http from "./http"

//获取验证码
const queryCaptchaImage = () => http.get("/captchaImage")


/* 暴露API */
const API = {
    queryCaptchaImage
}

export default API