<template>
    <div>
        <div id="nav">
            <div class="nav-main">
                <!--logo-->
                <div class="n-m-logo">Mr.Han</div>
                <!--头部登录-->
                <div class="n-m-login">
                    <el-popover
                            v-if="showUser"
                            placement="top-start"
                            width="100"
                            trigger="hover">
                        <p>欢迎登陆：{{login.user}}</p>
                        <el-button type="danger" @click="handleLoginOut" plain size="mini">退出登录</el-button>
                        <br>
                        <el-button
                                type="primary"
                                @click="handleUploadPhoto=true"
                                plain
                                size="mini"
                        >
                            修改头像
                        </el-button>
                        <a href="" slot="reference" class="img"
                           :style="{
                                backgroundImage : 'url('+this.login.photo+')',
                                position: 'absolute',
                                top: '10px',
                                left: '41px',
                                width: '40px',
                                height: '40px',
                                backgroundPosition: 'center center',
                                backgroundSize: 'cover',
                                borderRadius: '50%',
                                cursor:'pointer'
                              }"
                        />
                    </el-popover>
                    <div class="login" v-else>
                        <el-button type="primary" @click="ifLogin=true">登陆</el-button>
                        <el-button type="success" @click="ifShowRegister=true">注册</el-button>
                    </div>
                </div>
                <!--头部导航-->
                <div class="n-m-nav">
                    <ul :class="'list'+whichActive">
                        <li>
                            <router-link to="/">首页</router-link>
                        </li>
                        <li>
                            <router-link to="/blog/0">博客</router-link>
                        </li>
                        <li>
                            <router-link to="/message">留言</router-link>
                        </li>
                        <li>
                            <router-link to="/diary">日记</router-link>
                        </li>
                        <li>
                            <router-link to="/links">友链</router-link>
                        </li>
                        <li>
                            <router-link to="/about">关于</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <register :dialogVisible="ifShowRegister" @handleClose="closeRegister"/>
        <login :dialogVisible="ifLogin" @handleClose="closeLogin"/>
        <common-upload-photo :dialogVisible="handleUploadPhoto" @handleClose = "closeUpload"/>
    </div>
</template>

<script>
    import {postIfLogin,loginOut}from"../../../api/index"
    import Register from "../../content/register/Register";
    import Login from "../../content/login/Login";
    import CommonUploadPhoto from "../ uploadphoto/CommonUploadPhoto";
    export default {
        name: "CommonNav",
        data(){
            return{
                //路由列表
                routerList:["home","blog","message","diary","links","about"],
                /*是否注册*/
                ifShowRegister:false,
                /*是否登陆*/
                ifLogin:false,
                /*显示登陆头像*/
                showUser:false,
                /*用户信息*/
                login : {
                    user : "",
                    photo : ""
                },
                handleUploadPhoto:false
            }

        },
        computed:{
            whichActive(){
                //获取路由列表对应的索引值
                let index = this.routerList.indexOf(this.$route.name);
                return index+1;
            }
        },
        methods:{
            closeRegister(Bool){
                this.ifShowRegister = false;
                this.ifLogin = Bool;
            },
            closeLogin(){
                this.ifLogin = false;
            },
            handleLoginOut(){
                loginOut()
                    .then(res=>{
                        this.$message({
                            message: "退出登录成功",
                            type: 'success',
                            duration : 2000
                        });
                        setTimeout(()=>{
                            window.location.reload();
                        },1700)
                    })
                    .catch(()=>{
                        this.$message({
                            message: "退出失败…",
                            type: 'error',
                            duration : 2000
                        });
                    })
            },
            closeUpload(){
                this.handleUploadPhoto = false;
            }
        },
        components:{
            Register,
            Login,
            CommonUploadPhoto
        },
        mounted() {
            postIfLogin()
                .then(res=>{
                    if (res.data.userInfo){
                        this.showUser = true;
                        this.login.user = res.data.userInfo.user;
                        this.login.photo = res.data.userInfo.photo;
                    }else {
                        this.showUser = false;
                    }
                })
        }
    }
</script>

<style scoped lang="less">
    @import "../../../assets/css/varible.less";
    #nav {
        overflow: hidden;
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background-color: #fff;
        border-bottom: 1px solid #e8e9e7;

        > .nav-main {
            box-sizing: border-box;
            width: 100%;
            max-width: 1360px;
            height: 60px;
            margin: 0 auto;
            padding: 0 50px;
            /*background-color: pink;*/

            .n-m-logo {
                float: left;
                width: 100px;
                height: 60px;
                line-height: 60px;
                text-align: left;
                color: #777;
                font-size: 40px;
                font-family: BarbaraHand;
            }

            .n-m-login {
                position: relative;
                float: right;
                width: 122px;
                height: 60px;
                line-height: 60px;

                .el-button {
                    padding: 9px 13px;
                }
                >div.userInfo{
                    width: 100%;
                    height: 100%;
                }
            }

            .n-m-nav {
                float: right;
                width: 576px;
                height: 60px;
                margin-right: 8%;

                ul {
                    display: flex;
                    width: 100%;
                    height: 100%;

                    li {
                        flex: 1;

                        a {
                            position: relative;
                            display: block;
                            width: 100%;
                            height: 100%;
                            text-align: center;
                            line-height: 60px;
                            color: #212220;
                            font-weight: 400;
                            font-size: 15px;
                            transition: color .5s;

                            &::after {
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                right: 0;
                                margin: 0 auto;
                                content: "";
                                width: 0;
                                height: 2px;
                                background-color: @themeColor;
                                transition: width .5s;
                            }

                            &:hover {
                                color: @themeColor;

                                &::after {
                                    width: 100%;
                                }
                            }
                        }
                    }

                    &.list1 li:nth-child(1),
                    &.list2 li:nth-child(2),
                    &.list3 li:nth-child(3),
                    &.list4 li:nth-child(4),
                    &.list5 li:nth-child(5),
                    &.list6 li:nth-child(6) {
                        a {
                            color: @themeColor;

                            &::after {
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
