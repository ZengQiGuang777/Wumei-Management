<script>
export default {
    data() {
        //验证码校验规则
        let checkCode = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入验证码'));
            } else {
                if (value.length === 4) {
                    callback()
                }
            }
        };
        //验证第一次输入密码
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        //验证二次输入密码
        let validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error("两次密码输入不一致"));
            } else {
                callback();
            }
        };
        //验证用户名
        let validatorAccount = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            } else if (value.length > 15) {
                return callback(new Error('用户名不能超过15位'))
            } else {
                callback()
            }
        }
        return {
            ruleForm: {
                account: '',
                pass: '',
                checkPass: '',
                code: '',
            },
            rules: {
                account: [{ validator: validatorAccount, trigger: 'change' }],
                pass: [{ validator: validatePass, trigger: 'change' }],
                checkPass: [{ validator: validatePass2, trigger: 'change' }],
                code: [{ validator: checkCode, trigger: 'change' }],
            },
            inputStye: '320px'
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
};
</script>
<template>
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" class="container">
        <a-form-model-item has-feedback prop="account">
            <a-input v-model="ruleForm.account" autocomplete="off" placeholder="账号" :style="{ width: inputStye }">
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="pass">
            <a-input v-model="ruleForm.pass" type="password" autocomplete="off" placeholder="密码"
                :style="{ width: inputStye }" />
        </a-form-model-item>
        <a-form-model-item has-feedback prop="checkPass">
            <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off" placeholder="确认密码"
                :style="{ width: inputStye }" />
        </a-form-model-item>
        <a-form-model-item has-feedback prop="code">
            <a-input v-model="ruleForm.code" type="number" placeholder="验证码" :style="{ width: inputStye }" />
        </a-form-model-item>
        <a-form-model-item>
            <a-button type="primary" @click="submitForm('ruleForm')">
                注册
            </a-button>
        </a-form-model-item>
    </a-form-model>
</template>


<style lang="less" scoped>
.container {
    width: 500px;
    margin-top: -300px;
    text-align: center;
}
</style>