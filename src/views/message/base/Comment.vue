<template>
    <div class="Comment">
        <ul>
            <li>
                <div class="comment-parent">
                    <div class="p-img"></div>
                    <div class="p-info">
                        <div class="p-name"></div>
                        <div class="p-content"></div>
                        <div class="p-time">
                            <span> </span>
                            <a @click=""> </a>
                        </div>
                    </div>
                </div>
                <div class="comment-child">
                </div>
                <div>

                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Comment"
    }
</script>

<style scoped lang="less">
    .Comment{
        box-sizing: border-box;
        padding: 20px 15px;
        width: 100%;
        >ul{
            width: 100%;
            >li{
                padding: 20px 0;
                border-bottom: 1px dotted #333;
                .comment-parent{
                    display: flex;
                    .p-img{
                        width: 45px;
                        height: 45px;
                        background-position: center center;
                        background-size: cover;
                    }
                    .p-info{
                        flex: 1;
                        padding-bottom: 20px;
                        border-bottom: 1px dotted #aaa;
                        .p-name{
                            overflow: hidden;
                            color: #01aaed;
                        }
                        .p-content{
                            padding: 2px 0 5px 0;
                            min-height: 30px;
                            font-size: 12px;
                            word-break: break-all;
                        }
                        .p-time{
                            font-size: 12px;
                            color: #999;
                            span{
                                padding-left: 15px;
                                padding-right: 15px;
                            }
                            a{
                                color: blue;
                                cursor: pointer;
                            }
                        }
                    }
                }
                .comment-child{
                    display: flex;
                    box-sizing: border-box;
                    width: 100%;
                    padding-left: 50px;
                    padding-top: 20px;
                    .c-img{
                        width: 45px;
                        height: 45px;
                        background-position: center center;
                        background-size: cover;
                    }
                    .c-info{
                        flex: 1;
                        font-size: 12px;
                        .c-name{
                            .name{
                                color: #01aaed;
                                margin: 0 5px;
                            }
                        }
                        .c-time{
                            padding-left: 20px;
                            padding-top: 5px;
                            span{
                                margin-right: 10px;
                            }
                            a{
                                cursor: pointer;
                                color: blue;
                            }
                        }
                    }
                }
                .comment-reply{
                    overflow: hidden;
                    box-sizing: border-box;
                    width: 100%;
                    height: 0;
                    padding-left: 50px;
                    padding-top: 10px;
                    transition: height .3s;
                    &.show{
                        height: 100px;
                    }
                    textarea{
                        display: block;
                        width: 100%;
                        height: 60px;
                        border-color: #aaa;
                        padding: 10px;
                        box-sizing: border-box;
                        resize: none;
                    }
                    button{
                        margin-top: 8px;
                        display: block;
                    }
                }
            }
        }
    }
</style>
