<template>
    <div class="HotInfo">
        <div class="hot">
            <h3>{{info}}</h3>
            <ul>
                <li v-for="(item,index) in articleHot">
                    <i>{{index+1}}</i>
                    <router-link :to="'/Article/'+item._id">{{item.title}}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HotInfo",
        props:{
            articleHot:{
                type:Array,
                default:function () {
                    return []
                }
            },
            info:{
                type: String,
                return:function () {
                    return ""
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .hot{
        box-sizing: border-box;
        width: 100%;
        margin-top: 20px;
        background-color: #fff;
        padding: 15px 20px 20px;
    h3{
        padding: 0 5px 10px;
        line-height: 30px;
        font-weight: 400;
        border-bottom: 1px solid #e8e9e7;
        color: #383937;
        position: relative;
        font-size: 18px;
    }
    ul{
        margin-top: 15px;
    li{
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        margin: 7px 0;
    a{
        color: #787977;
        font-size: 14px;
        text-decoration: none;
    &:hover{
         color: #6bc30d;
         text-decoration: underline;
     }
    }
    i{
        display: inline-block;
        width: 22px;
        height: 22px;
        margin-right: 10px;
        font-style: normal;
        font-size: 12px;
        color: #666;
        line-height: 22px;
        text-align: center;
        border-radius: 100%;
        background-color: #edefee;
        text-shadow: 0 1px 0 rgba(255,255,255,.5);
    }
    &:nth-child(1) i{
         background-color: #e24d46;
         color: #fff;
     }
    &:nth-child(2) i{
         background-color: #2ea7e0;
         color: #fff;
     }
    &:nth-child(3) i{
         background-color: #6bc30d;
         color: #fff;
     }
    }
    }
    }
</style>
