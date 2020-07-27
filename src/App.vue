<template>
  <div id="app">
    <common-nav v-if="!$route.name.includes('home')&&!$route.name.includes('article')"/>
    <router-view/>
    <!--返回顶部-->
    <common-back-top/>
  </div>
</template>
<script>
  import CommonNav from "./components/common/nav/CommonNav";
  import CommonBackTop from "./components/common/backtop/CommonBackTop";
  export default {
    name:"app",
    components:{
      CommonNav,
      CommonBackTop
    },
  }
</script>
<style lang="less">

  //初始样式引入及字体样式
  @import "assets/css/reset.css";
  @import "assets/css/font.css";
  #app{
    width: 100%;
    background: url("./assets/img/bg.jpg") center top/cover fixed;
  }
</style>
