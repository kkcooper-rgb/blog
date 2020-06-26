<template>
    <div class="RightSearchNav">
        <div class="search">
            <div class="search-main">
                <input type="text"  placeholder="请输入搜索内容">
            </div>
            <div class="search-article">
                <ul>
                    <li v-for="item in getArticleTags"><a href="">{{item}}</a></li>
                </ul>
                <div class="cover"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RightSearchNav",
        data(){
            return{
                getArticleTags:["全部文章","HTML&CSS","JavaScript","Node","Vue&React","Other"]
            }
        }
    }
</script>

<style scoped lang="less">
    .search{
        width: 100%;
        background-color: #fff;
        padding-bottom: 20px;
        .search-main{
            position: relative;
            box-sizing: border-box;
            width: 100%;
            height: 80px;
            padding: 20px;
            background-color: grey;
            input{
                width: 100%;
                height: 40px;
                border-radius: 20px;
                border: 0;
                outline: 0;
                text-indent: 2em;
            }
            i{
                position: absolute;
                right: 35px;
                top: 29px;
                width: 22px;
                height: 22px;
                font-size: 18px;
                line-height: 22px;
                text-align: right;
                font-weight: bolder;
                color: rgb(120, 121, 119);
                cursor: pointer;
            }
        }
        .search-article{
            position: relative;
            width: 100%;
            margin-top: 20px;
            ul {
                width: 100%;
                li {
                    position: relative;
                    box-sizing: border-box;
                    z-index: 1;
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 30px;
                    a{
                        display: block;
                        width: 100%;
                        height: 100%;
                        color: #787977;
                        border-bottom: 1px dotted #eee;
                    }
                }
            }
            .cover{
                box-sizing: border-box;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 40px;
                border-right: 5px solid #000;
                background-color: rgba(0,0,0,.05);
                transition: top .3s;
            }
        }
    }
</style>
