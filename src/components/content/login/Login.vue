<template>
    <div class="Login">
        <el-dialog
                title="账号登陆"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="beforeClose"
                center>
            <el-form :model="form" :rules="rules" ref="form" label-width="80px" >
                <el-form-item label="用户名" prop="user">
                    <el-input v-model="form.user" />
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="form.pwd"  show-password/>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleClick">确 定</el-button>
                <el-button  @click=" ">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {postLogin} from "../../../api/index"
    export default {
        name: "Login",
        data(){
            return{
                form: {
                    user : "",
                    pwd : "",
                },
                rules: {
                    //用户名验证
                    user:[
                        { required: true, message: '请输入用户名',trigger:'blur'},
                        {
                            type:"string",
                            pattern: /^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/,
                            message: '2-7位，数字 字母 _ - 中日韩文',
                            trigger: ['blur','change']
                        }
                    ],
                    //密码验证
                    pwd : {
                        type:"string",
                        validator : (rule,value,cb)=>{
                            if (value){
                                //验证密码是否符合规则
                                if (/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(value)){
                                    cb();
                                }else{
                                    cb(new Error("6-18位，不允许出现奇怪的字符哦~"));
                                }
                            }else{
                                cb(new Error("请输入密码"));
                            }
                            //在这里还需要触发确认密码的验证
                            this.form.checkPwd && this.$refs.form.validateField("checkPwd");
                        },
                        required: true,
                        message: '6-18位，不允许出现奇怪的字符',
                        trigger: ['blur','change']
                    }

                },
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
        methods:{
            async changePostLogin(){
                if (!this.form.user)return;
                const result = await postLogin(this.form);
                console.log(result);
                this.$refs["form"].validate((valid) => {
                    if (valid) {
                        //验证通过
                        if(result.data.code){
                            //登陆失败
                            this.$message({
                                message: result.data.msg,
                                type: 'error',
                                duration : 2000
                            });
                        }else {
                            //登陆成功
                            this.$message({
                                message: result.data.msg,
                                type: 'success',
                                duration : 2000
                            });
                            setTimeout(()=>{
                                this.$emit("handleClose");
                                window.location.reload();
                            },1000);
                        }
                    } else {
                        //验证没通过
                        return false;
                    }
                });
            },
            handleClick(){
                this.changePostLogin()
            },
            /*关闭的回调*/
            beforeClose(done){
                this.$confirm('确认关闭？')
                    .then(()=> {
                        this.$emit("handleClose",false);
                    })
                    .catch(()=> {});
            }
        },
        mounted() {
            this.changePostLogin()
        }

    }
</script>

<style scoped lang="less">
    .el-form{
        user-select: none;
        padding-right: 30px;

        .vcode{
            .el-input{
                float: left;
                width: 35%;
            }
            div.svg{
                float: left;
                width: 35%;
                height: 40px;
                /deep/ svg{
                    width: 100% !important;
                    height: 100% !important;
                }
            }
            .el-link{
                font-size: 12px;
            }
        }
    }
</style>
