<template>
    <div class="LoaderMore">
        <!--正在加载图标-->
        <div class="loading" v-if="ifLoading">
            <span>加载中</span>
            <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
        </div>
        <!--文章加载完的提示-->
        <p class="no-more" v-if="ifNoMore">哼╭(╯^╰)╮我也是有底线的！！</p>
    </div>
</template>

<script>
    export default {
        name: "LoaderMore",
        props:{
            ifLoading:{
                type:Boolean,
                default:function () {
                    return false
                }
            },
            ifNoMore:{
                type:Boolean,
                default:function () {
                    return false
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .loading{
        position: relative;
        height: 42px;
        background-color: #fff;
        text-align: center;
        span{
            display: inline-block;
            height: 42px;
            line-height: 42px;
            vertical-align: middle;
        }
        svg{
            vertical-align: middle;
            height: 42px;
            width: 42px;
            animation: loading-rotate 2s linear infinite;
            circle{
                animation: loading-dash 1.5s ease-in-out infinite;
                stroke-dasharray: 90,150;
                stroke-dashoffset: 0;
                stroke-width: 2;
                stroke: #409eff;
                stroke-linecap: round;
                color: black;
            }
        }
        @keyframes loading-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-40px}to{stroke-dasharray:90,150;stroke-dashoffset:-120px}}
        @keyframes loading-rotate{to{transform:rotate(1turn)}}
    }
    .no-more{
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #fff;
        font-size: 12px;
    }
</style>
