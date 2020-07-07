<template>
    <div class="Register">
        <el-dialog
                title="注册"
                :visible.sync="dialogVisible"
                width="30%"
                center>
            <el-form
                    ref="form"
                    :model="form"
                    label-width="80px"
                    :rules="rules">
                <el-form-item label="用户名" prop="user">
                    <el-input v-model="form.user"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="form.pwd" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPwd">
                    <el-input v-model="form.checkPwd" type="password"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="svgCode" class="vcode" >
                    <el-input v-model="form.svgCode"></el-input>
                    <div class="svg" v-html="register.svgText"></div>
                    <el-link type="primary" @click="getVCode" :disabled="register.disabled" :underline="register.underline">{{register.refreshText}}</el-link>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="centerDialogVisible = false">立即注册</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getRegisterVCode}from"../../../api/index"
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
                    checkPwd:{
                        validator:(rule,value,cb)=>{
                            if(value){
                                if (value===this.from.pwd){
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
                    }
                },
                register:{
                    svgText:"loading...",
                    refreshText:"刷新",
                    disabled : false,
                    underline:false
                }
            };
        },
        props:{
            dialogVisible:{
                type:Boolean
            }
        },
        mounted() {
            this.changeGetRegister()
        },
        methods:{
            async changeGetRegister(){
                const result = await getRegisterVCode();
                this.register.svgText = result.data.data;
            },
            getVCode(){
                this.changeGetRegister()
            }
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
