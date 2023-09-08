<template>
    <div class="music-box" v-if="info">
        <!-- 头部 -->
        <header class="header-box">
            <div class="base">
                <div class="cover">
                    <img :src="info.pic" alt="">
                </div>
                <div class="info">
                    <h2 class="title">{{ info.title }}</h2>
                    <h3 class="author">{{ info.author }}</h3>
                </div>
            </div>
            <a href="javascript:;" @click="handle" :class="{
                'player-button': true,
                'move': isPlay
            }"></a>
        </header>

        <!-- 歌词 -->
        <main class="main-box">
            <div class="wrapper" :style="{
                transform: `translateY(${y}px)`
            }">
                <p v-for="item in lyricList" :key="item.id" ref="para" :class="{
                    'active': item.active
                }">
                    {{ item.text }}
                </p>
            </div>
        </main>

        <!-- 尾部 -->
        <footer class="footer-box">
            <div class="bar">
                <span class="time current">{{ time.current }}</span>
                <div class="progress">
                    <div class="already" :style="{
                        width: already
                    }"></div>
                </div>
                <span class="time duration">{{ time.duration }}</span>
            </div>
            <a href="#" class="download">下载这首音乐</a>
        </footer>

        <!-- 其它 -->
        <audio :src="info.audio" class="audio-box" preload="metadata" ref="myAudio"></audio>
        <div class="mark-image" :style="{
            backgroundImage: `url(${info.pic})`
        }"></div>
        <div class="mark-overlay"></div>
    </div>
    <div class="loading-box" v-else>
        <div class="content">
            <img src="../assets/images/loading.gif" alt="">
            <span>奴家正在努力加载中...</span>
        </div>
    </div>
</template>

<script>
// 格式化时间的方法 
const format = function format(time) {
    let minutes = Math.floor(time / 60),
        seconds = Math.round(time - minutes * 60)
    minutes = minutes < 10 ? '0' + minutes : '' + minutes
    seconds = seconds < 10 ? '0' + seconds : '' + seconds
    return {
        minutes,
        seconds
    }
}

export default {
    name: 'MusicPage',
    data() {
        return {
            info: null,
            isPlay: false,
            lyricList: [],
            y: 0, //记录wrapper移动的距离
            num: 0, //记录累计匹配的数量
            already: '0%',
            time: {
                current: '00:00',
                duration: '00:00'
            }
        }
    },
    methods: {
        // 歌词解析
        formatLyric(lyric) {
            // 处理歌词部分的特殊符号
            lyric = lyric.replace(/&#(\d+);/g, (value, $1) => {
                let instead = value
                switch (+$1) {
                    case 32:
                        instead = " "
                        break
                    case 40:
                        instead = "("
                        break
                    case 41:
                        instead = ")"
                        break
                    case 45:
                        instead = "-"
                        break
                    default:
                }
                return instead
            })
            // 解析歌词信息
            let arr = [],
                index = 0
            lyric.replace(
                /\[(\d+)&#58;(\d+)&#46;(?:\d+)\]([^&#?]+)(?:&#10;)?/g,
                (_, $1, $2, $3) => {
                    arr.push({
                        id: ++index,
                        minutes: $1,
                        seconds: $2,
                        text: $3,
                        active: false
                    })
                }
            )
            this.lyricList = arr
        },
        // 控制音乐的播放或暂停的
        handle() {
            const myAudio = this.$refs.myAudio
            if (myAudio.paused) {
                // 当前是暂停状态：我们让其播放
                myAudio.play()
                this.isPlay = true
                this.playing()
                if (!this.timer) {
                    this.timer = setInterval(this.playing, 1000)
                }
                return
            }
            // 当前是播放：我们让其暂停
            myAudio.pause()
            this.isPlay = false
            clearInterval(this.timer)
            this.timer = null
        },
        // 播放中要做的事情
        playing() {
            let myAudio = this.$refs.myAudio,
                { currentTime, duration } = myAudio
            if (isNaN(currentTime) || isNaN(duration)) return
            let { minutes: curM, seconds: curS } = format(currentTime),
                { minutes: durM, seconds: durS } = format(duration)

            // 已经播放完毕
            if (currentTime >= duration) {
                this.playend()
                return
            }

            // 控制进度条变化
            this.time.current = `${curM}:${curS}`
            this.time.duration = `${durM}:${durS}`
            this.already = `${currentTime / duration * 100}%`

            // 控制歌词的变化
            let matchs = this.lyricList.filter(item => {
                return item.minutes === curM && item.seconds === curS
            })
            if (matchs.length === 0) return
            this.lyricList.forEach(item => {
                item.active = matchs.includes(item)
            })
            this.num += matchs.length
            if (this.num > 3) {
                this.y = -(this.num - 3) * this.$refs.para[0].offsetHeight
            }
        },
        // 播放完毕要做的事情
        playend() {
            clearInterval(this.timer)
            this.timer = null

            this.time.current = '00:00'
            this.already = '0%'
            this.y = 0
            this.num = 0
            this.isPlay = false
            this.lyricList(item => item.active = false)
        }
    },
    async created() {
        // 第一次渲染之前：向服务器发送请求
        try {
            let { code, data } = await this.$API.queryLyric()
            if (+code === 0) {
                // 请求成功
                this.info = Object.freeze(data)
                this.time.duration = data.duration
                this.formatLyric(data.lyric)
                return
            }
        } catch (_) { }
        // 请求失败
        alert('获取数据失败！请稍后再试！')
    }
}
</script>

<style lang="less" scoped>
/* 基础样式 */
.header-box,
.footer-box,
.main-box {
    box-sizing: border-box;
    height: 100px;
    overflow: hidden;
}

.main-box {
    height: calc(100vh - 200px);
}

.text-clip {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

/* Loading层 */
.loading-box {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    background: #555;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {

        img,
        span {
            display: block;
        }

        img {
            margin: 0 auto;
            width: 50px;
            height: 50px;
        }

        span {
            margin-top: 10px;
            color: rgb(25, 137, 250);
        }
    }
}

/* 背景层 */
.mark-overlay,
.mark-image {
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
}

.mark-image {
    z-index: -2;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(6px);
}

.mark-overlay {
    z-index: -1;
    background: rgba(0, 0, 0, .5);
}

/* 头部区域样式 */
.header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;

    .player-button {
        margin-left: 5px;
        width: 35px;
        height: 35px;
        background: url('../assets/images/music.svg') no-repeat;
        background-size: 100% 100%;

        &.move {
            animation: musicMove 1s linear 0s infinite both;
        }
    }

    .base {
        flex-grow: 1;
        display: flex;

        .cover {
            width: 70px;
            height: 70px;
            background: #AAA;

            img {
                display: block;
                width: 100%;
                height: 100%;
            }

            img[src=""] {
                display: none;
            }
        }

        .info {
            flex-grow: 1;
            margin-left: 5px;
            max-width: 230px;

            .title,
            .author {
                line-height: 35px;
                color: #fff;
                font-size: 17px;
                .text-clip;
            }

            .author {
                font-size: 15px;
            }
        }
    }
}

@keyframes musicMove {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* 歌词区域样式 */
.main-box {
    .wrapper {
        transform: translateY(0);
        transition: transform .3s;

        p {
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 15px;
            color: @comText;

            &.active {
                color: @primary;
                transition: color .3s;
            }
        }
    }
}

/* 尾部区域样式 */
.footer-box {
    padding: 0 10px;

    .download {
        display: block;
        margin: 0 auto;
        width: 213px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        text-indent: 20px;
        border-radius: 25px;
        background: url('../assets/images/sprite_play.png') no-repeat @primary;
        background-size: 40px 350px;
        background-position: 10px -291.5px;
    }

    .bar {
        display: flex;
        align-items: center;

        .time {
            width: 40px;
            line-height: 46px;
            text-align: center;
            font-size: 12px;
            color: @comText;
        }

        .progress {
            position: relative;
            flex-grow: 1;
            height: 2px;
            background: @comText;

            .already {
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                height: 100%;
                background: @primary;
            }
        }
    }
}

/* 音频 */
.audio-box {
    display: none;
}
</style>
