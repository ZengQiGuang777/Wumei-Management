<script>
import ut from '@/assets/utils'

export default {
    data() {
        return {
            imageURL: '',
            token: ut.storage.get('TK')
        }
    },
    methods: {
        uploadSuccess(response) {
            let { code, msg, url } = response
            if (+code === 200) {
                this.imageURL = url
                this.$message.success('恭喜您，上传成功')
                return
            }
            this.$message.error(msg)
        },
        uploadError(err) {
            this.$message.error('网络繁忙请稍后再试')
        },
        beforeUpload(file) {
            let { size } = file
            if (size > 100 * 1024) {
                this.$message.warning('上传的图片不能超过100KB')
                return false
            }
            return true
        },
        // =======
        async request({ file }) {
            try {
                let { code, msg, url } = await this.$API.uploadImage(file)
                if (+code === 200) {
                    this.imageURL = url
                    this.$message.success('恭喜您，上传成功')
                    return
                }
                this.$message.error(msg)
            } catch (_) { }
        }
    }
}
</script>

<template>
    <div class="category-box">
        <!-- 
        <el-upload class="avatar-uploader" 
            :show-file-list="false" 
            accept="image/*" 
            :before-upload="beforeUpload"
            :on-success="uploadSuccess" 
            :on-error="uploadError" 
            action="/api/iot/tool/upload"
            :headers="{ Authorization: token }"
        >
            <img v-if="imageURL" :src="mixinPrefixAdd(imageURL)" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> 
        -->

        <el-upload class="avatar-uploader" :show-file-list="false" accept="image/*" :before-upload="beforeUpload" action=""
            :http-request="request">
            <img v-if="imageURL" :src="mixinPrefixAdd(imageURL)" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<style lang="less" scoped>
.category-box {
    min-height: 300px;
    background: #FFF;
}

.avatar-uploader {
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    border: 1px solid #DDD;

    display: flex;
    justify-content: center;
    align-items: center;

    .avatar {
        width: 100px;
        height: 100px;
    }

    .avatar-uploader-icon {
        font-size: 20px;
    }
}
</style>