<template>
  <div class="breadcrumb_con"> 

    <div class="hamburger_icon">
      <svg t="1492500959545" @click="toggleSideBar" class="wscn-icon hamburger" :class="{'is-active':sidebar.opened}"  style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64"><path d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z" p-id="1692"></path><path d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z" p-id="1693"></path><path d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z" p-id="1694"></path></svg>
    </div>

    <el-breadcrumb class="app_bread" separator="/">
      <el-breadcrumb-item v-for="(item, index) in levelList" v-if="item.name" :key="item.path">
          {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name:'breadcrumb',
  data() {
      return {
          levelList: null
      }
  },
  created() {
    this.getBreadcrumb();
  },
  computed: {
    ...mapGetters([
       'sidebar'
    ])
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched;
      
      if((matched[0].name == '框架合同' && matched[0].name !== '框架合同列表') || (matched[0].name == '项目合同' && matched[0].name !== '项目合同列表') ||(matched[0].name == '支出合同'&&matched[0].name !== '支出合同列表')){
        matched = [{name: '合同签署', path: '/contract'}].concat(matched);
      }
      this.levelList = matched;
      console.log(matched)
    },
    toggleSideBar() {
      console.log('click')
      this.$store.dispatch('ToggerSidebar');
    }
  }
}
</script>
 
 <style lang="less" scoped>
 .breadcrumb_con{
    box-sizing: border-box;
    background: #f5f5f5;
    height: 50px;
    line-height: 50px;
    z-index: 99;
    position: relative;
    .hamburger_icon{
        padding: 0 10px;
        line-height: 58px;
        float: left;
        .hamburger {
            cursor: pointer;
            width: 20px;
            height: 20px;
            transform: rotate(0deg);
            transition: .38s;
            transform-origin: 50% 50%;
            vertical-align: 0;
            &.is-active {
              transform: rotate(90deg);
            }
        }
    }
    .app_bread{
      display: inline-block;
      font-size: 14px;
      line-height: 50px;
      margin-left: 10px;
    }
 }
 </style>
 