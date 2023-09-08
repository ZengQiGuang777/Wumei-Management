<script>
export default {}
</script>

<template>
    <div class="user-layout-wrapper">
        <div class="container">
            <div class="user-layout-content">
                <div class="top">
                    <div class="header">
                        <a href="javascript:;">
                            <img src="@/assets/images/logo.svg" class="logo" alt="">
                            <span class="title">物联网管理系统</span>
                        </a>
                    </div>
                    <div class="desc">&nbsp;</div>
                </div>
                <router-view />
                <div class="footer">
                    <div class="links">
                        <a href="javascript:;">帮助</a>
                        <a href="javascript:;">隐私</a>
                        <a href="javascript:;">条款</a>
                    </div>
                    <div class="copyright">
                        Copyright © 2023 FastBee All Rights Reserved.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.user-layout-wrapper {
    height: 100%;

    .container {
        width: 100%;
        min-height: 100%;
        background: #f0f2f5 url('@/assets/images/background.svg') no-repeat 50%;
        background-size: 100%;
        position: relative;

        .user-layout-content {
            padding: 32px 0 24px;

            .top {
                text-align: center;

                .header {
                    height: 44px;
                    line-height: 44px;

                    .logo {
                        height: 44px;
                        vertical-align: top;
                        margin-right: 16px;
                        border-style: none;
                    }

                    .title {
                        font-size: 33px;
                        color: rgba(0, 0, 0, .85);
                        font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
                        font-weight: 600;
                        position: relative;
                        top: 2px;
                    }
                }

                .desc {
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.45);
                    margin-top: 12px;
                    margin-bottom: 40px;
                }
            }

            .footer {
                width: 100%;
                bottom: 0;
                padding: 0 16px;
                margin: 48px 0 24px;
                text-align: center;

                .links {
                    margin-bottom: 8px;
                    font-size: 14px;

                    a {
                        color: rgba(0, 0, 0, 0.45);
                        transition: all 0.3s;

                        &:not(:last-child) {
                            margin-right: 40px;
                        }
                    }
                }

                .copyright {
                    color: rgba(0, 0, 0, 0.45);
                    font-size: 14px;
                }
            }
        }
    }
}
</style>