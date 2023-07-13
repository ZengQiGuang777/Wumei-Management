<script>
import ut from '@/assets/utils'
import router from '@/router';
export default {
    data() {
        // 校验密码的格式
        const validatePassword = (_, value, callback) => {
            // if (value === place) return callback()
            if (value.length === 0) return callback(new Error('密码是必填项哦~'))
            /* let reg = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
            if (!reg.test(value)) return callback(new Error('密码格式有误~')) */
            callback()
        }
        return {
            captcha: {
                isLoading: true,
                img: '',
                uuid: ''
            },
            ruleForm: {
                username: '',
                password: '',
                code: '',
                remeber: false
            },
            rules: {
                username: [
                    {
                        required: true, message: '账号必须要填哦', trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        validator: validatePassword, trigger: 'blur'
                    }
                ],
                code: [
                    {
                        required: true, message: '验证码也必须要填铁汁', trigger: 'blur'
                    }
                ],
            }

        }
    },
    /* 在创建的时候发一次请求 */
    created() {
        this.queryCaptcha()
    },
    methods: {
        //获取验证码
        async queryCaptcha() {
            this.captcha.isLoading = true
            try {
                let { code, img, uuid } = await this.$API.queryCaptchaImage()
                if (+code !== 200) {
                    this.$message.error('网络出现异常，请稍后再试')
                } else {
                    this.captcha.img = `data:image/jpeg;base64,${img}`
                    this.captcha.uuid = uuid
                }
            } catch (err) {
                console.log(err);
            }
            this.captcha.isLoading = false
        },
        //登录校验
        async submit() {
            try {
                //先进行表单校验
                await this.$refs.formIns.validate()
                //获取表单中的数据，向服务器发送请求
                let { username, password, code, remeber } = this.ruleForm
                let { code: resultCode, token, msg } = await this.$API.checkUserLogin({
                    username,
                    password,
                    code,
                    uuid: this.captcha.uuid
                })
                //登录失败
                if (+resultCode !== 200) {
                    this.$message.error(msg)
                    return
                }
                //登录成功
                //首先设置token
                ut.storage.set('TK', token)
                await this.$store.dispatch('setProfileAsync')
                if (remeber) {
                    ut.storage.set('REMBER', {
                        username,
                        password,//真实开发一定要加密
                    })
                } else {
                    ut.storage.remove('REMBER')
                }
                this.$message.success('铁汁，登录成功了')
                this.$router.push('/home')
            } catch (_) { 
                console.log({_})
            }
        }
    },
}
</script>

<template>
    <a-form-model id="container" ref="formIns" :model="ruleForm" :rules="rules">
        <a-form-model-item prop="username">
            <a-input placeholder="用户名" style="width: 320px;" v-model="ruleForm.username">
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
            <a-input placeholder="密码" style="width: 320px;" type="password" v-model="ruleForm.password">
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
        </a-form-model-item>
        <a-form-model-item class="checkingBox" prop="code">
            <!-- 验证码 -->
            <div class="yzm">
                <a-input placeholder="验证码" style="width: 220px;" v-model="ruleForm.code">
                    <a-icon slot="prefix" type="inbox" style="color: rgba(0,0,0,.25)" />
                </a-input>
                <!-- 验证码盒子 -->
                <div class="captcha">
                    <a-spin :spinning="captcha.isLoading">
                        <img :src="captcha.img" alt="" @click="queryCaptcha">
                    </a-spin>
                </div>
            </div>
        </a-form-model-item>
        <!-- 记住密码 -->
        <a-form-model-item prop="remeber">
            <a-checkbox>
                记住密码
            </a-checkbox>
        </a-form-model-item>
        <a-form-item class="login-form-last">
            <a-button type="primary" class="login-form-button" @click="submit">
                Log in
            </a-button>
        </a-form-item>
    </a-form-model>
</template>

<style lang="less" scoped>
#container {
    margin-top: -300px;

    // text-align: center;
    .login-form-last {
        text-align: center;
    }

    .login-form-button {
        text-align: center;
        width: 80%;
    }

    .yzm {
        display: flex;

        .captcha {
            height: 32px;
            flex: 1;
            text-align: center;
            background: rgba(0, 0, 0, 0.05);
            margin-left: 5px;

            .ant-spin-container {
                img {
                    margin-top: -8px;
                    width: 95px;
                    height: 34px;
                    cursor: pointer;
                }
            }

            .ant-spin {
                height: 80%;
            }
        }
    }

}
</style>