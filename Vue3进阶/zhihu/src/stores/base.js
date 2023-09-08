import { defineStore } from 'pinia'
import { ref } from 'vue'
import API from '@/api'

const useBaseStore = defineStore('base', () => {
  /* 定义公共状态 */
  const profile = ref(null)

  /* 修改公共状态的方法 */
  // 从服务器获取登录者信息
  const queryProfile = async () => {
    let info = null
    try {
      let { code, data } = await API.userInfo()
      if (+code === 0) {
        info = data
        profile.value = info
      }
    } catch (_) { }
    return info
  }

  /* 暴露给外面用 */
  return {
    profile,
    queryProfile
  }
})
export default useBaseStore
