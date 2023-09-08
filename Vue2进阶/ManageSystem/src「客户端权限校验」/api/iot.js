import http from "./http"
import store from "@/store"
import ut from "@/assets/utils"

// 获取物模型类别信息「数据缓存」
const queryIotThingsType = async () => {
    let cache = ut.storage.get('cache_iot_things_type')
    if (cache) return cache
    let arr = []
    try {
        let { code, data } = await http.get('/system/dict/data/type/iot_things_type')
        if (+code === 200) {
            // 把服务器返回的数据变为自己需要的
            arr = data.map(item => {
                return {
                    label: item.dictLabel,
                    value: item.dictValue,
                    class: item.listClass
                }
            })
            // 把处理后的数据缓存到本地
            ut.storage.set('cache_iot_things_type', arr)
        }
    } catch (_) { }
    return arr
}

// 获取物模型数据类型信息
const queryIotDataType = async () => {
    let cache = ut.storage.get('cache_iot_data_type')
    if (cache) return cache
    let arr = []
    try {
        let { code, data } = await http.get('/system/dict/data/type/iot_data_type')
        if (+code === 200) {
            arr = data.map(({ dictLabel, dictValue }) => {
                return {
                    label: dictLabel,
                    value: dictValue
                }
            })
            // 存储到本地
            ut.storage.set('cache_iot_data_type', arr)
        }
    } catch (_) { }
    return arr
}

// 获取物模型列表信息「支持分页和搜索」
const queryTemplateList = obj => {
    let { pageNum = 1, pageSize = 10, templateName, type } = obj,
        params = {
            pageNum,
            pageSize
        }
    if (templateName) params.templateName = templateName
    if (type) params.type = type
    return http.get('/iot/template/list', { params })
}

// 获取指定物模型的详细信息
const queryTemplateInfo = templateId => http.get(`/iot/template/${templateId}`)

// 新增物模型信息
const _TemplateParams = {
    templateName: '',
    identifier: '',
    modelOrder: 0,
    type: 1,
    datatype: 'integer',
    isChart: 0,
    isHistory: 0,
    isMonitor: 0,
    isReadonly: 0,
    specs: '',
    templateId: null,
    userId: null,
    userName: null,
    tenantId: null,
    tenantName: null,
    isSys: null,
    delFlag: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null
}
const insertTemplateInfo = obj => {
    obj = Object.assign({}, _TemplateParams, obj)
    obj.createBy = store.state?.profile?.user?.userName
    return http.post('/iot/template', obj)
}

// 修改物模型信息「瞎猜的」
const updateTemplateInfo = obj => {
    // 相比较于新增，obj中需要多传递一个templateId
    obj = Object.assign({}, _TemplateParams, obj)
    obj.createBy = store.state?.profile?.user?.userName
    return http.put('/iot/template', obj)
}

// 删除物模型信息「瞎猜的」
const deleteTemplateInfo = ids => {
    if (!Array.isArray(ids)) ids = [ids]
    return http.delete('/iot/template', {
        data: {
            ids
        }
    })
}

export default {
    queryIotThingsType,
    queryIotDataType,
    queryTemplateList,
    queryTemplateInfo,
    insertTemplateInfo,
    updateTemplateInfo,
    deleteTemplateInfo
}