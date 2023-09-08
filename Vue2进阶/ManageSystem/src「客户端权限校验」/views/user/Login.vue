<script>
import ut from '@/assets/utils'

const place = '********'  //占位符：不能和用户自己输入的一致、能需要通过Form表单校验
export default {
    data() {
        // 校验密码的格式
        const validatePassword = (_, value, callback) => {
            if (value === place) return callback()
            if (value.length === 0) return callback(new Error('密码是必填项哦~'))
            /* let reg = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
            if (!reg.test(value)) return callback(new Error('密码格式有误~')) */
            callback()
        }

        return {
            // 控制选项卡
            activeName: 'account',
            // 验证码相关状态
            captcha: {
                img: '',
                uuid: '',
                loading: false
            },
            // 表单相关状态
            ruleForm: {
                username: '',
                password: '',
                code: '',
                remember: true
            },
            rules: {
                username: [
                    { required: true, message: '账号是必填项哦~', trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '验证码是必填项哦~', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 获取验证码
        async queryCaptcha() {
            this.captcha.loading = true
            try {
                let { code, img, uuid } = await this.$API.queryCaptchaImage()
                if (+code !== 200) {
                    this.$message.error('网络出现异常，获取验证码失败')
                } else {
                    this.captcha.img = `data:image/jpeg;base64,${img}`
                    this.captcha.uuid = uuid
                }
            } catch (_) { }
            this.captcha.loading = false
        },
        // 登录校验
        async submit() {
            try {
                // @1 先进行表单校验
                await this.$refs.formIns.validate()
                // @2 获取表单中的数据，向服务器发送请求
                let { username, password, code, remember } = this.ruleForm
                if (password === place) {
                    // 说明用户没有改过密码
                    password = this.remberOldPass
                }
                let { code: resultCode, token, msg } = await this.$API.checkUserLogin({
                    username,
                    password,
                    code,
                    uuid: this.captcha.uuid
                })
                if (+resultCode !== 200) {
                    // 登录失败
                    this.$message.error(msg)
                    // 重新获取验证码
                    this.queryCaptcha()
                    this.ruleForm.code = ''
                    return
                }
                // 登录成功
                ut.storage.set('TK', token)
                await this.$store.dispatch('setProfileAsync')
                if (remember) {
                    ut.storage.set('REMBER', {
                        username,
                        password //真实开发中一定要MD5加密
                    })
                } else {
                    ut.storage.remove('REMBER')
                }
                this.$message.success('恭喜您，登录成功！')
                // 跳转处的细节
                let target = this.$route.query.target
                target ? this.$router.replace(target) : this.$router.push('/')
            } catch (_) { }
        }
    },
    created() {
        // 第一次渲染组件：立即获取验证码
        this.queryCaptcha()

        // 第一次渲染组件：验证是否有记住账号密码，如果有记住，则赋值给对应的框
        const remberInfo = ut.storage.get('REMBER')
        if (remberInfo) {
            this.ruleForm.username = remberInfo.username
            this.ruleForm.password = place
            this.remberOldPass = remberInfo.password
        }
    }
}
</script>

<template>
    <div class="main">
        <el-form :model="ruleForm" :rules="rules" ref="formIns" class="user-layout-login">
            <el-form-item prop="username">
                <el-input placeholder="请输入账号" prefix-icon="el-icon-user" v-model.trim="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input placeholder="请输入密码" prefix-icon="el-icon-key" show-password
                    v-model.trim="ruleForm.password"></el-input>
            </el-form-item>
            <el-row :gutter="16">
                <el-col :span="16">
                    <el-form-item prop="code">
                        <el-input placeholder="请输入验证码" prefix-icon="el-icon-mobile" v-model.trim="ruleForm.code"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <div class="captcha" @click="queryCaptcha" v-loading="captcha.loading"
                        element-loading-spinner="el-icon-loading">
                        <img :src="captcha.img" alt="">
                    </div>
                </el-col>
            </el-row>
            <el-form-item prop="remember">
                <el-checkbox v-model="ruleForm.remember">记住密码</el-checkbox>
            </el-form-item>

            <button-again type="primary" class="login-button" @click="submit">
                立即登录
            </button-again>
        </el-form>
    </div>
</template>

<style lang="less" scoped>
.main {
    min-width: 260px;
    width: 368px;
    margin: 0 auto;

    .el-form-item {
        margin-bottom: 18px;
    }

    .login-button {
        font-size: 16px;
        width: 100%;
    }

    .getCaptcha {
        display: block;
        width: 100%;
        height: 40px;
    }

    .captcha {
        position: relative;
        height: 40px;
        background: #DDD;
        cursor: pointer;

        img {
            display: block;
            width: 100%;
            height: 100%;

            &[src=""] {
                display: none;
            }
        }
    }

    :deep(.el-loading-mask) {
        background: transparent;

        .el-icon-loading {
            font-size: 26px;
        }

        .el-loading-spinner {
            margin-top: -13px;
        }
    }
}
</style>
