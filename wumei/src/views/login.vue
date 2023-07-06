<template>
    <div class="user-login">
        <div class="user-head">
            <div class="user-head-total">
                <div class="imgBox">
                </div>
                <div class="wordsBox">
                    <span>FastBee</span>
                    <span>开源物联网平台</span>
                </div>
            </div>
        </div>
        <a-form id="container" :form="form" class="login-form" @submit="handleSubmit">
            <a-form-item>
                <a-input v-decorator="[
                    'userName',
                    { rules: [{ required: true, message: 'Please input your username!' }] },
                ]" placeholder="Username" style="width: 320px;">
                    <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input v-decorator="[
                    'password',
                    { rules: [{ required: true, message: 'Please input your Password!' }] },
                ]" type="password" placeholder="Password" style="width: 320px;">
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-checkbox v-decorator="[
                    'remember',
                    {
                        valuePropName: 'checked',
                        initialValue: true,
                    },
                ]">
                    记住密码
                </a-checkbox>
                <a class="login-form-forgot" href="">
                    忘记了您的密码？
                </a>
                或者
                <a href="">
                    马上创建？
                </a>
                <a-button type="primary" html-type="submit" class="login-form-button">
                    Log in
                </a-button>

            </a-form-item>
        </a-form>
    </div>
</template>

<script>
export default {
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
        },
    },
};
</script>
<style lang="less" scoped>
.user-login {
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;

    #container {
        margin-top: -300px;
        text-align: center;

        .login-form-button {
            width: 80%;
        }
    }

    .user-head {
        width: 100%;
        color: rgb(255, 255, 255);
        background-color: rgb(15, 115, 238);
        width: 100%;
        height: 200px;
        text-align: center;
        padding: 15px;
        font-family: 微软雅黑;

        .user-head-total {
            width: 300px;
            height: 100px;
            margin: 0 auto;
            margin-top: 20px;
            display: flex;

            .imgBox {
                width: 100px;
                height: 100px;
                background-color: red;
                background: url(../assets/login.gif);
                background-size: cover;
            }

            .wordsBox {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: left;
                word-spacing: 5px;

                &>:nth-child(1) {
                    font-size: 40px;
                    font-weight: 600;
                }

                &>:nth-child(2) {
                    font-size: 20px;
                }

            }
        }
    }
}
</style>