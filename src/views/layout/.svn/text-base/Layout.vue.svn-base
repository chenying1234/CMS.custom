<template>
  <el-row class="app_container" :class="{hideSidebar: !sidebar.opened}">
      <el-col :span="24" class="header_col">
         <headerbar></headerbar>
      </el-col>
      <el-col :span="24" class="content_col">
            <!-- <div class="sidebar_wrapper"> -->
                <Sidebar class="sidebar_container"/>
            <!-- </div> -->
            <div class="main_container">
                <Breadcrumb/>
                <App-main/>
            </div>
      </el-col>
      <!-- <p class="footer">&copy; CCWOnline.com 2017</p> -->
  </el-row>
</template>

<script>
//在index.js中先定义才可以，否则需要3行
import { headerbar, Sidebar, Breadcrumb, AppMain } from "@/views/layout"
import { mapGetters } from 'vuex'
// import AppMain from '@/views/layout/AppMain'
// import Breadcrumb from '@/views/layout/Breadcrumb'
// import Sidebar from '@/views/layout/Sidebar'
export default {
  data() {
    return {
        
    };
  },
  computed: {
    ...mapGetters([
       'sidebar'
    ])
  },
  components: {
    headerbar,
    Sidebar,
    Breadcrumb,
    AppMain
  }
};
</script>
<style lang="less" scoped>
.app_container {
    width: 100%;
    height: 100%;
  .header_col {
      height: 60px;
      line-height: 60px;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 999;
  }
  .content_col{
      position: absolute;
      top: 60px;
      bottom: 0;
    //   .sidebar_wrapper{
    //       width: 230px;
    //       z-index: 999;
    //       transition: all .28s ease-out;
    //       position: absolute;
    //       left: 0;
    //       top: 0;
    //       bottom: 0;
    //       overflow: hidden;
    //       .sidebar_container{
    //         height: 100%;
    //         overflow-y: auto;
    //         transition: all .28s ease-out;
    //       }
    //   }
      .main_container{
          position: relative;
          height: 100%;
          margin-left: 230px;
          transition: all .2s ease-out;
          overflow: hidden;
      }
  }
    &.hideSidebar{
        .content_col{
            // .sidebar_wrapper {
            //     // transform: translate(-190px, 0);
            //     // width: 40px;
            //     // .sidebar_container {
            //     //     transform: translate(182px, 0);
            //     // }
            // }
            .main_container{
                margin-left: 40px !important;
            }
        }
    }
  
  .footer {
    text-align: center;
    background-color: #f1f1f1;
    padding: 30px 0;
    font-size: 14px;
    font-family: Arial;
    line-height: 20px;
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
  }
}
</style>
<style lang="less">
.hideSidebar{
    .sys_name{
        span{
            width: 40px !important;
        }
    }
}
</style>
