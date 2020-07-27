<template>
    <div class="Container">
        <!--element-ui布局-->
        <el-container>
            <!--主体文章-->
            <el-main>
                <!--文章内容-->
                <article-show :articleList="articleList"/>
                <!--文章加载提示-->
                <loader-more :ifLoading="ifLoading" :ifNoMore="ifNoMore"/>
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
                <visitor :visitor="visitor" />
            </el-aside>
        </el-container>
    </div>
</template>

<script>
    import request from "../../../api";
    const getArticleShow = request.getArticleShow;
    import {getArticleInfo,getArticleHot,getArticleComment,getVisitor} from "../../../api/index"
    import RightSearchNav from "./RightSearchNav";
    import HotCommentInfo from "./HotCommentInfo";
    import Visitor from "./Visitor";
    import ArticleShow from "./ArticleShow";
    import LoaderMore from "./LoaderMore";
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
                articleList:[],
                //是否加载
                ifLoading:false,
                //no-more的显示与否
                ifNoMore:false,
            }
        },
        mounted() {
            this.changeArticleInfo();
            this.changeArticleHot();
            this.changeArticleComment();
            this.changeArticleShow();
            this.changVisitor();
            //监听滚动事件
            window.addEventListener("scroll",this.handleScroll)
        },
        computed:{
          id(){
              return this.$route.params.id
          }
        },
        watch:{
            id(){
                //当id发生变化时
                this.changeArticleShow();
                document.documentElement.scrollTop = 0;
            }
        },
        methods:{
            //获取tags数据
            async changeArticleInfo(){
                const result = await getArticleInfo();
                this.getArticleTags = ["全部文章",...result.data.data.tags]
            },
            //获取热门文章
            async changeArticleHot(){
                const result = await getArticleHot(0,8);
                this.articleHot = result.data.data
            },
            //获取推荐置顶
            async changeArticleComment(){
                const result = await getArticleComment();
                this.articleComment = result.data.data
            },
            //获取推荐置顶
            async changeArticleShow(){
                const result = await getArticleShow(this.id,true);
                this.articleList = result.data.data
            },
            async changVisitor(){
                const result = await getVisitor();
                this.visitor = result.data.data
            },
            handleScroll(){
                if (this.ifNoMore||this.ifLoading)return;
                //滚动高度
                let a = document.documentElement.scrollTop;
                //可视区的高度
                let b = document.documentElement.clientHeight;
                //文档高度
                let c = document.documentElement.offsetHeight;
                if (a+b>c-200){
                    this.ifLoading = true;
                    getArticleShow(this.id,false).then(res=>{
                        this.ifLoading = false;
                        let data = res.data.data;
                        if (data.length){
                            this.articleList.push(...res.data.data);
                        }else{
                            this.ifNoMore = true;
                        }
                    })
                }
            }
        },
        components:{
            RightSearchNav,
            HotCommentInfo,
            Visitor,
            ArticleShow,
            LoaderMore
        },
        destroyed() {
            window.removeEventListener("scroll",this.handleScroll)
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
