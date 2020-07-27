<template>
    <div class="Message">
        <div class="content">
            <section>
                <h2>留言板</h2>
                <p>沟通交流，拉近你我！</p>
                <!--layUi 富文本-->
                <common-lay-edit @Sub="handleSubmit"/>
            </section>
        </div>
    </div>
</template>

<script>
    import {postIfLogin}from"../../api/index"
    import CommonEdit from "../../components/common/Edit/CommonElementEdit";
    import CommonLayEdit from "../../components/common/Edit/CommonLayEdit";
    export default {
        name: "Message",
        methods:{
            handleSubmit(val){
                console.log(val);
                postIfLogin()
                    .then(res=>{
                        if (res.data.userInfo){

                        }else {
                            layer.msg('请先登陆', {icon: 2});
                        }
                    })
                    .catch(()=>{
                        layer.msg('服务器错误~请稍后再试', {icon: 2});
                    })
            }
        },
        components:{
            CommonEdit,
            CommonLayEdit
        }
    }
</script>

<style scoped lang="less">
    .Message{
        box-sizing: border-box;
        max-width: 1360px;
        padding: 70px 50px;
        margin: 0 auto;
        .content{
            width: 100%;
            background-color: #fff;
            section:nth-child(1){
                box-sizing: border-box;
                width: 100%;
                padding: 20px 15px;
                >h2{
                    font-weight: 700;
                    font-size: 2rem;
                    text-align: center;
                }
                >p{
                    font-size: 1.25rem;
                    margin: 1rem 0;
                    text-align: center;
                }
            }
        }
    }
</style>
