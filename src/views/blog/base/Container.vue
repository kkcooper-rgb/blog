<template>
    <div class="Container">
        <!--element-ui布局-->
        <el-container>
            <!--主体文章-->
            <el-main>
                <!--文章内容-->
                <article-show :articleList="articleList"/>
            </el-main>
            <!--侧边栏-->
            <el-aside>
                <!--搜索及侧边导航栏-->
                <right-search-nav :getArticleTags="getArticleTags"/>
                <!--热门文章-->
                <hot-comment-info :info="hot" :articleHot="articleHot"/>
                <!--推荐置顶-->
                <hot-comment-info :info="comment" :articleHot="articleComment"/>
                <!--访客-->
                <visitor/>
            </el-aside>
        </el-container>
    </div>
</template>

<script>
    import {getArticleInfo,getArticleHot,getArticleComment,getArticleShow} from "../../../api/index"
    import RightSearchNav from "./RightSearchNav";
    import HotCommentInfo from "./HotCommentInfo";
    import Visitor from "./Visitor";
    import ArticleShow from "./ArticleShow";
    export default {
        name: "Container",
        data(){
            return{
                /*文章分类（tags）*/
                getArticleTags:[],
                /*热门文章列表*/
                articleHot:[],
                /*推荐置顶列表*/
                articleComment:[],
                hot:"热门文章",
                comment:"推荐置顶",
                /*这是最近访客的数据*/
                visitor:[],
                articleList:[]
            }
        },
        mounted() {
            this.changeArticleInfo();
            this.changeArticleHot();
            this.changeArticleComment();
            this.changeArticleShow()
        },
        methods:{
            //获取tags数据
            async changeArticleInfo(){
                const result = await getArticleInfo();
                this.getArticleTags = ["全部文章",...result.data.data.tags]
            },
            //获取热门文章
            async changeArticleHot(){
                const result = await getArticleHot();
                this.articleHot = result.data.data
            },
            //获取推荐置顶
            async changeArticleComment(){
                const result = await getArticleComment();
                this.articleComment = result.data.data
            },
            //获取推荐置顶
            async changeArticleShow(){
                const result = await getArticleShow();
                this.articleList = result.data.data
            },

        },
        components:{
            RightSearchNav,
            HotCommentInfo,
            Visitor,
            ArticleShow
        }
    }
</script>

<style scoped lang="less">
    .Container{
        padding-top: 80px;
        width: 100%;
        user-select: none;
        >.el-container{
            box-sizing: border-box;
            width: 100%;
            max-width: 1360px;
            margin: 0 auto;
            padding: 0 50px;
            >.el-aside {
                width: 300px;
            }
            >.el-main {
                padding-top: 0;
                padding-left: 0;
            }
        }
    }

</style>
