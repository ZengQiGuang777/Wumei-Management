<script setup>
import useBaseStore from '@/stores/base'
import useAutoImport from '@/useAutoImport'
const {
  reactive, ref, onUnmounted,
  API, router, route, showSuccessToast, showFailToast, utils
} = useAutoImport()

const baseStore = useBaseStore()

/* 定义状态 */
const formIns = ref(null)
const state = reactive({
  phone: '',
  code: '',
  btn: {
    disabled: false,
    text: '发送验证码'
  }
})

/* 发送验证码 */
let timer = null,
  count = 30
const handleSendCode = async () => {
  try {
    // 先对手机号进行校验
    await formIns.value.validate('phone')
    // 向服务器发送请求
    let { code } = await API.userSendCode(state.phone)
    if (+code === 0) {
      // 开启倒计时
      state.btn.disabled = true
      state.btn.text = `30s后重发`
      timer = setInterval(() => {
        if (count === 1) {
          clearInterval(timer)
          count = 30
          state.btn.disabled = false
          state.btn.text = `发送验证码`
          return
        }
        count--
        state.btn.text = `${count}s后重发`
      }, 1000)
      return
    }
    showFailToast('发送失败，稍后再试')
  } catch (_) { }
}
onUnmounted(() => clearInterval(timer))

/* 登录提交 */
const submit = async () => {
  try {
    await formIns.value.validate()
    let { code, token } = await API.userLogin(state.phone, state.code)
    if (+code !== 0) {
      showFailToast('登录失败，请稍后再试')
      return
    }
    // 登录成功：存储Token、获取登录者信息、提示、跳转
    utils.storage.set('TK', token)
    await baseStore.queryProfile()
    showSuccessToast('登录成功')
    let target = route.query.target
    target ? router.replace(target) : router.push('/')
  } catch (_) { }
}
</script>

<template>
  <nav-back title="登录/注册" />
  <van-form ref="formIns" validate-first>
    <van-cell-group inset>
      <van-field center label="手机号" label-width="50px" name="phone" v-model.trim="state.phone" :rules="[
        { required: true, message: '手机号是必填项' },
        { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机号格式不正确' }
      ]">
        <template #button>
          <button-again class="form-btn" size="small" type="primary" loading-text="处理中" :disabled="state.btn.disabled"
            @click="handleSendCode">
            {{ state.btn.text }}
          </button-again>
        </template>
      </van-field>

      <van-field label="验证码" label-width="50px" name="code" v-model.trim="state.code" :rules="[
        { required: true, message: '验证码是必填项' },
        { pattern: /^\d{6}$/, message: '验证码格式不正确' }
      ]" />
    </van-cell-group>

    <div style="margin: 20px 40px">
      <ButtonAgain round block type="primary" loading-text="正在处理中..." @click="submit">
        立即登录/注册
      </ButtonAgain>
    </div>
  </van-form>
</template>

<style lang="less" scoped>
.van-form {
  margin-top: 30px;

  .form-btn {
    width: 78px;
  }
}
</style>