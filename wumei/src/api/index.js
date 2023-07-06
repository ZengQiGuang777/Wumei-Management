import { Spin } from "ant-design-vue";
import axios from "axios";
// 引入qs模块，用来序列化post类型的数据，后面会提到
// vant的toast提示框组件，大家可根据自己的ui组件更改。
const instance = axios.create({
    //基准地址 可直接配置路径，也可以代理路径
    baseURL: '/api',
    //超时时间
    timeout: 5000
})
//请求拦截
instance.interceptors.response.use(response=>{
    return response
},error=>{
    return Promise.reject(error)
})

//配置响应拦截器
axios.interceptors.response.use(response=>{
    //关闭loading效果
    
})


