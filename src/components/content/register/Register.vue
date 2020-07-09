<template>
    <div class="Register">
        <el-dialog
                title="注册账号"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="beforeClose"
                center>
            <el-form
                    ref="form"
                    :model="form"
                    label-width="80px"
                    :rules="rules">
                <el-form-item label="用户名" prop="user">
                    <el-input v-model="form.user"/>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="form.pwd" show-password/>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPwd">
                    <el-input v-model="form.checkPwd" show-password/>
                </el-form-item>
                <el-form-item label="验证码" prop="svgCode" class="vcode" >
                    <el-input v-model="form.svgCode"/>
                    <div class="svg" v-html="register.svgText"></div>
                    <el-link type="primary" @click="getVCode" :disabled="register.disabled" :underline="register.underline">{{register.refreshText}}</el-link>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="handleClick" :disabled="register.submitDisabled">立即注册</el-button>
                 <el-button @click="resetForm">重置</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getRegisterVCode,getRegisterCheckVCode,postRegister}from"../../../api/index"
    export default {
        name: "Register",
        data() {
            return {
                form: {
                    user : "",
                    pwd : "",
                    checkPwd : "",
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
                    },
                    //再次密码验证
                    checkPwd:{
                        validator:(rule,value,cb)=>{
                            if(value){
                                if (value===this.form.pwd){
                                    cb()
                                }else {
                                    cb(new Error("两次密码不一致"))
                                }
                            }else {
                                cb(new Error("请再次输入密码"))
                            }
                        },
                        required: true,
                        trigger: ['blur','change']
                    },
                    //svg验证
                    svgCode : {
                        validator : (rule,value,cb)=>{
                            if (!value){
                                cb(new Error("请输入验证码！"));
                            }else{
                                getRegisterCheckVCode(value).then(res=>{
                                    if (res.data.code === 0){
                                        cb();
                                    }else{
                                        cb(new Error("验证码错误"));
                                    }
                                }).catch(e=>{
                                    cb(new Error("未知错误…"));
                                });
                            }
                        },
                        required: true,
                        trigger: 'blur'
                    }
                },
                register:{
                    svgText:"loading...",
                    refreshText:"刷新",
                    disabled : false,
                    underline:false,
                    submitDisabled:false,
                    timer:null

                }
            };
        },
        props:{
            dialogVisible:{
                type:Boolean,
                default:function () {
                    return true
                }
            }
        },
        mounted() {
            this.changeGetRegister();
            this.changePostRegister();
        },
        methods:{
            async changeGetRegister(){
                const result = await getRegisterVCode();
                // console.log(result);
                clearInterval(this.register.timer);
                let t =0;
                let fn=()=>{
                    t+=1000;
                    if(t>result.data.time){
                        clearInterval(this.register.timer);
                        this.register.disabled = false;
                        this.register.refreshText = "刷新";
                    }else {
                        this.register.disabled = true;
                        this.register.refreshText = (((result.data.time - t)/1000)|0) + "s后可以刷新";
                    }
                };
                this.register.timer = setInterval(fn,1000);
                fn();

                this.register.svgText = result.data.data;
            },
            getVCode(){
                this.changeGetRegister()
            },
            /*注册的点击*/
            async changePostRegister(){
                if (!this.form.user)return;
                const result = await postRegister(this.form);
                this.$refs["form"].validate((valid) => {
                    this.register.submitDisabled = true;
                    if (valid) {
                        //验证通过
                        this.changeGetRegister();
                        if(result.data.code){
                            this.$message({
                                message: result.data.msg,
                                type: 'error',
                                duration : 2000
                            });
                            this.register.submitDisabled = false;
                        }else {
                            //注册成功
                            this.$message({
                                message: '注册成功！',
                                type: 'success',
                                duration : 2000
                            });
                            setTimeout(()=>{
                                this.register.submitDisabled = false;
                                this.$emit("handleClose",true);
                            },1000)
                        }
                    } else {
                        this.register.submitDisabled = false;
                        //验证没通过
                        return false;
                    }
                });
            },
            handleClick(){
                this.changePostRegister();
            },
            resetForm() {
                this.$refs["form"].resetFields();
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
        destroyed() {
            clearTimeout(this.register.timer);
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
