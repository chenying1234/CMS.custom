<template>
    <div class="navbar">
        <div class="sys_name">
            <span></span>合同管理系统
        </div>    
        <el-dropdown class="avatar_con" trigger="click">
            <div class="avatar_wrapper">
                <img src="../../assets/avatar.jpg" class="avatar_img" />
                <i class="el-icon-caret-bottom"/>
                <div class="avatar_name">欢迎您，{{roles[0]}}-{{userName}}</div>
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
                <router-link  class='inlineBlock' to="/">
                    <el-dropdown-item>
                        首页
                    </el-dropdown-item>
                </router-link>
                <el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
 
<script>
import { mapGetters } from 'vuex'
export default {
  name:'navbar',
  data() {
    return {
    //   roleName: "",
    //   name: ""
    };
  },
  computed: {
      ...mapGetters([
          'userName',
          'roles'
      ])
  },
  methods: {
      logout() {
          this.$confirm('确认退出登录吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
            this.$store.dispatch('FedLoginOut').then(() => {
                location.reload();  // 为了重新实例化vue-router对象 避免bug
            });
          }).catch(() => {

          })
          
      }
  }
};
</script>

<style lang="less" scoped>
.navbar {
  height: 60px;
  line-height: 60px;
  z-index: 999;
  background: #fff;
  .sys_name {
    width: 230px;
    background: #51d2b7;
    text-align: center;
    color: #ffffff;
    span {
      width: 0;
      height: 60px;
      background: #324157;
      transition: all 0.28s ease-out;
      float: left;
    }
  }
  .avatar_con {
    position: absolute;
    right: 30px;
    top: 0;
    height: 50px;
    .avatar_wrapper {
      cursor: pointer;
      position: relative;
      .avatar_img {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        vertical-align: middle;
      }
      .el-icon-caret-bottom {
        font-size: 12px;
      }
      .avatar_name {
        position: absolute;
        right: calc(~"100% + 12px");
        white-space: nowrap;
        top: 0;
      }
    }
  }
}
</style>
