<script>
import dayjs from 'dayjs'

export default {
    data() {
        return {
            list: [],
            visible: false,
            tipInfo: null
        }
    },
    async created() {
        try {
            let { code, rows } = await this.$API.queryNoticeList()
            if (+code === 200) {
                this.list = Object.freeze(rows)
            }
        } catch (_) { }
    },
    methods: {
        formatTime(time) {
            return dayjs(time).format('YYYY/MM/DD')
        },
        handle(item) {
            this.tipInfo = item
            this.visible = true
        }
    }
}
</script>

<template>
    <div class="news-box">
        <h2 class="title">
            <i class="el-icon-news"></i>
            最新信息
        </h2>
        <el-skeleton :rows="5" animated v-if="list.length === 0" />
        <div class="content" v-else>
            <div class="item" v-for="item in list" :key="item.noticeId" @click="handle(item)">
                <p class="title">
                    <el-tag size="mini" :color="+item.noticeType === 2 ? '#E6A23C' : '#409EFF'">
                        {{ +item.noticeType === 2 ? '公告' : '信息' }}
                    </el-tag>
                    {{ item.noticeTitle }}
                </p>
                <p class="time">
                    <i class="el-icon-timer"></i>
                    {{ formatTime(item.createTime) }}
                </p>
            </div>
        </div>

        <!-- 提示框 -->
        <el-dialog :visible.sync="visible" :title="tipInfo?.noticeTitle">
            <div class="time-box">
                <el-tag size="mini" :color="+tipInfo?.noticeType === 2 ? '#E6A23C' : '#409EFF'">
                    {{ +tipInfo?.noticeType === 2 ? '公告' : '信息' }}
                </el-tag>
                <span>{{ tipInfo?.createTime }}</span>
            </div>
            <div class="text-box" v-html="tipInfo?.noticeContent"></div>
        </el-dialog>
    </div>
</template>

<style lang="less" scoped>
.title {
    margin-bottom: 0;
    font-size: 18px;
    line-height: 50px;

    i {
        font-size: 20px;
    }
}

.content {
    .item {
        display: flex;
        cursor: pointer;

        .title,
        .time {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            height: 52.5px;
            line-height: 52.5px;
        }

        .title {
            flex-basis: calc(100% - 120px);
            font-size: 15px;

            .el-tag {
                color: #FFF;
                border: none;
            }

            .el-tag--mini {
                line-height: 20px;
            }
        }

        .time {
            margin-left: 10px;
            margin-bottom: 0;
            flex-basis: 110px;
            text-align: right;
        }
    }
}

:deep(.el-skeleton) {
    margin-top: 10px;
}

:deep(.el-dialog__body) {
    padding: 10px 20px 20px;

    .time-box {
        line-height: 40px;

        .el-tag {
            margin-right: 10px;
            color: #FFF;
            border: none;
        }
    }

    .text-box {
        padding: 10px;
        border: 1px solid #DDD;

        p {
            margin: 10px 0;
        }

        ol {
            padding-left: 30px;
            list-style: initial;

            li {
                line-height: 30px;
            }
        }
    }
}
</style>