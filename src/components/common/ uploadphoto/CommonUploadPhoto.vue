<template>
    <div class="CommonUploadPhoto">
        <el-dialog
                title="头像上传"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="beforeClose"
                >
            <el-upload
                    class="avatar-uploader"
                    action="http://localhost:3000/upload/photo"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :with-credentials="true">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "CommonUploadPhoto",
        data(){
            return{
                imageUrl: '',
            }
        },
        props:{
            dialogVisible:{
                type:Boolean,
                default:function () {
                    return true
                }
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                console.log(res,file);
                this.imageUrl = URL.createObjectURL(file.raw);
                this.$message({
                    message: "头像上传成功",
                    type: 'success',
                    duration : 2000
                });
                setTimeout(()=>{
                    window.location.reload();
                },1000)
            },
            beforeAvatarUpload(file) {

                const isType = /^(image\/jpeg|image\/png|image\/gif)$/.test(file.type);
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isType) {
                    this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!');
                }
                if (!isType) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isType && isLt2M;
            },
            beforeClose(){
                this.$emit("handleClose");
            }
        }
    }
</script>

<style lang="less">
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
