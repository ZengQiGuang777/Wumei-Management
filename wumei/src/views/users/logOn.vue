<script>
import router from '@/router';
export default {
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: "normal_login" });
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log("Received values of form: ", values);
                }
            });
        },
    },
    components: { router }
};
</script>

<template>
    <a-form id="container" :form="form" class="login-form" @submit="handleSubmit">
        <a-form-item>
            <a-input v-decorator="[
                'username',
                { rules: [{ required: true, message: '请输入用户名!' }] },
            ]" placeholder="用户名" style="width: 320px;">
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-input v-decorator="[
                'password',
                { rules: [{ required: true, message: '请输入密码!' }] },
            ]" type="password" placeholder="密码" style="width: 320px;">
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
        </a-form-item>
        <a-form-item class="checkingBox">
            <a-input v-decorator="[
                'code',
                { rules: [{ required: true, message: '请输入验证码!' }] },
            ]" placeholder="验证码" style="width: 220px;">
                <a-icon slot="prefix" type="inbox" style="color: rgba(0,0,0,.25)" />
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-checkbox v-decorator="[
                'remember',
                {
                    valuePropName: 'checked',
                    initialValue: false,
                },
            ]">
                记住密码
            </a-checkbox>
        </a-form-item>
        <a-form-item>
            <a herf="#/login/register">
                忘记了您的密码？
            </a>
            或者
            <a href="#/login/create">
                马上创建？
            </a>
            <a-button type="primary" html-type="submit" class="login-form-button">
                Log in
            </a-button>
        </a-form-item>
    </a-form>
</template>

<style lang="less" scoped>
#container {
    margin-top: -300px;
    text-align: center;

    .login-form-button {
        width: 80%;
    }
}
</style>