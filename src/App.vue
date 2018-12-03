<template>
  <div class="app">
    <!-- 头部 -->
    <board-hearder></board-hearder>
    <!-- 路由 -->
    <div class="router-view">
       <router-view/>
    </div>
    <!-- loading -->
    <loading></loading>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import boardHearder from './common/board-hearder'
  export default {
    props: ['boardApi','accountName','accountEnglist', 'appLogo'],
    data () {
      return {

      }
    },
    created() {
         window.localStorage.setItem('boardApi',this.boardApi);
         this.setAccountInfo({
           accountName:this.accountName,
           accountEnglist:this.accountEnglist,
           appLogo:this.appLogo
         })
    },
    methods:{
     ...mapMutations([
       'setAccountInfo'
      ])
    },
    components: {
      boardHearder
    }
  }

</script>

<style lang="less">
  @import './assets/less/reset.less';
  @import url('./assets/font/iconfont.css');
  .app{
     display: flex;
     flex-direction: column;
     .router-view{
       position: absolute;
       top: 80px;
       bottom: 10px;
       left: 0;
       width: 100%;
       &>div{
         height: 100%;
       }
     }
 }
</style>
