import { Button } from 'vant'
import { ref, useAttrs, useSlots, computed } from 'vue'

const ButtonAgain = {
  inheritAttrs: false,
  setup() {
    const attrs = useAttrs(),
      slots = useSlots()

    // 基于计算属性，计算出Button需要的属性信息
    const props = computed(() => {
      let attrs = useAttrs(),
        props = {}
      Reflect.ownKeys(attrs).forEach((key) => {
        if (key === 'loading' || key === 'onClick') return
        props[key] = attrs[key]
      })
      return props
    })

    // 自己控制loading效果
    const loading = ref(false)
    const handle = async (ev) => {
      loading.value = true
      try {
        await attrs.onClick(ev)
      } catch (_) {}
      loading.value = false
    }

    return () => {
      return (
        <Button {...props.value} loading={loading.value} onClick={handle}>
          {slots.default()}
        </Button>
      )
    }
  }
}
export default ButtonAgain

/* 
// JSX：函数式组件「静态组件：无法基于内部的状态更改，让视图更新」
function ButtonAgain(props,{slots}){
  return <div>
    
  </div>
}
export default ButtonAgain 
*/
