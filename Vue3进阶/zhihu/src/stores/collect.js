import { defineStore } from 'pinia'
import { ref } from 'vue'
import API from '@/api'
import { showFailToast, showSuccessToast } from 'vant'

const useCollectStore = defineStore('collect', () => {
    /* 定义状态 */
    const collectList = ref(null)

    /* 派发的方法 */
    const queryCollectList = async () => {
        let list = null
        try {
            let { code, data } = await API.storeList()
            if (+code === 0) {
                list = data
                collectList.value = list
            }
        } catch (_) { }
        return list
    }
    const removeCollectList = async (id) => {
        if (!collectList?.value) return
        try {
            let { code } = await API.storeRemove(id)
            if (+code !== 0) {
                showFailToast('移除失败')
                return
            }
            showSuccessToast('移除成功')
            collectList.value = collectList.value.filter(item => {
                return +item.id !== +id
            })
        } catch (_) { }
    }
    const insertCollectList = async (newsId) => {
        try {
            let { code } = await API.storeAdd(newsId)
            if (+code !== 0) {
                showFailToast('收藏失败')
                return
            }
            await queryCollectList()
            showSuccessToast('收藏成功')
        } catch (_) { }
    }

    /* 暴露给外面用 */
    return {
        collectList,
        queryCollectList,
        removeCollectList,
        insertCollectList
    }
})
export default useCollectStore
