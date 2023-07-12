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
        <router-view />
        <div class="user-login-bottom">
            <a href="">返回官网</a>
            <a href="">查看文档</a>
            <a href="#/login/create">
                马上创建
            </a>
        </div>
    </div>
</template>

<script>

</script>
<style lang="less" scoped>
.user-login {
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    position: relative;

    .user-login-bottom {
        text-align: center;
        position: fixed;
        left: 43%;
        top: 64%;

        a {
            margin: 0 10px;
            color: #606266;
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