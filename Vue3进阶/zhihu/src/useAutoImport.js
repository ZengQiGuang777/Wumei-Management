import * as vue from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showSuccessToast, showFailToast } from 'vant'
import dayjs from 'dayjs'
import API from './api'
import utils from './assets/utils'

export default function useAutoImport() {
    const router = useRouter(),
        route = useRoute()
    return {
        ...vue,
        router,
        route,
        dayjs,
        API,
        showSuccessToast,
        showFailToast,
        utils
    }
}