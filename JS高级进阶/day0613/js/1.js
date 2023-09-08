/*
 实现具备有效期的 localStorage 存储方案
   + localStorage.setItem/getItem/removeItem
   + 设置的值，都只能是 字符串 格式的
 */
const storage = {
    // 存储信息的时候，记录一下存储的时间
    set(key, value) {
        let obj = {
            time: +new Date(), //存储时，当前日期的时间戳
            value
        }
        localStorage.setItem(key, JSON.stringify(obj))
    },
    // 获取存储信息的时候，判断一下时效性
    get(key, expires = 2592000000) {
        let obj = localStorage.getItem(key)
        if (!obj) return null  //传递的key压根不存在
        let { time, value } = JSON.parse(obj)
        if (+new Date() - time > expires) {
            // 存储的信息已经过了指定的时效：移除存储的信息、返回null
            storage.remove(key)
            return null
        }
        return value
    },
    // 移除指定信息 
    remove(key) {
        localStorage.removeItem(key)
    }
}


const query = async function query() {
    // 执行QUERY方法的第一件事情：先看本地是否有此数据的缓存
    let result = storage.get('CACHE', 7 * 24 * 60 * 60 * 1000)
    if (result) {
        // 本地是具备有效缓存的，则停止向服务器发送请求
        console.log('请求成功：', result)
        return
    }
    // 数据没有缓存过：则向服务器发送请求
    try {
        let result = await axios.get('/api/list', {
            params: {
                lx: 'my'
            }
        })
        console.log('请求成功：', result)
        // 请求成功：把请求的结果存储到本地
        storage.set('CACHE', result)
    } catch (_) { }
}
query()