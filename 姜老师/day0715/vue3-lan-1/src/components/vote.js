import { computed, reactive, toRefs } from "vue"

// 计算投票信息的, vue3 对于基本的使用进行了简化， 对于复杂的逻辑，根据用户的水平进行扩扩展
export function useVote() {
    const state = reactive({ sup: 5, opp: 5 })
    const { sup, opp } = toRefs(state); // 转化响应式
    const total = computed(() => state.sup + state.opp);
    const per = computed(() => state.sup / total.value * 100 + '%')
    const change = (type) => {
        type === 'sup' ? state.sup++ : state.opp++;
    }
    return {sup, opp, total, per, change}
}
// (todo、小组件 )vue-router， vuex ， pinia  + 项目