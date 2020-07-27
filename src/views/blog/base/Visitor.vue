<template>
    <div class="visitor">
        <h3>最近访客</h3>
        <ul>
            <li v-for="item in visitor" :style="{backgroundImage:'url('+item.user.photo+')'}">
                <p>{{item.user.user}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Visitor",
        props:{
            visitor:{
                type:Array,
                default:function () {
                    return []
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .visitor{
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
            margin-top: 10px;
            li{
                position: relative;
                float: left;
                width: 23%;
                height: 60px;
                margin: 1%;

                background-position: center top;
                background-size: cover;
                background-repeat: no-repeat;

                p{
                    overflow: hidden;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    background-color: rgba(0,0,0,.3);
                    color: #fff;
                    font-size: 12px;
                }
            }
            &::after{
                display: block;
                content: '';
                width: 0;
                height: 0;
                clear: both;
            }
        }
    }
</style>
