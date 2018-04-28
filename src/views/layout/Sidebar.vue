<template>
    <div class="sidebar_wrapper" :class="{hideSidebar: !sidebar.opened}">
        <el-menu :default-active="$route.path" unique-opened theme="dark" class="no_collapsed">
            <template v-for="(item, index) in permission_routers" v-if='!item.hidden'>
                <el-submenu :index="index+''" v-if="!item.noDropdown" :key="index">
                    <template slot="title"><i :class="item.icon" class="sidebar_icon"></i>{{item.name}}</template>
                    <ul class="el-menu">
                        <template v-for="child in item.children" v-if="!child.hidden">
                            <li class="el-menu-item second_item" :class="$route.path.indexOf(child.path.substring(0,child.path.lastIndexOf('/'))) !== -1 ? 'is-active' : ''">
                                <router-link :to="item.path + '/' + child.path" @click.native="flushCom($event,item.path+'/'+child.path)">
                                    {{child.name}}
                                </router-link>
                            </li>
                        </template>
                    </ul>
                </el-submenu>
               
                 <li v-if="item.noDropdown&&item.children.length>0" :key="index" class="el-menu-item" :class="$route.path.indexOf(item.path) !== -1 ? 'is-active' : ''">
                    <router-link :to="item.path" @click.native="flushCom($event,item.path+'/'+item.children[0].path)">
                        <i :class="item.icon" class="sidebar_icon"></i>{{item.name}}
                    </router-link>
                </li>
            </template>
        </el-menu>
        
         <ul class="el-menu collapsed" ref="menuCollapsed">
            <li v-for="(item,index) in permission_routers" v-if="!item.hidden" :key="item.id" class="el-submenu">
                <template v-if="!item.noDropdown">
                    <div class="el-submenu__title" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                        <i :class="item.icon"></i>
                    </div>
                    <ul class="el-menu submenu" :class="'submenu-hook-'+index" > 
                        <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)" @click="$router.push(item.path+'/'+child.path)">{{child.name}}</li>
                    </ul>
                </template>
                <template v-else>
                    <div class="el-submenu__title" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)" :class="$route.path==item.redirect?'is-active':''" @click="$router.push(item.path+'/'+item.children[0].path)">
                        <i :class="item.icon"></i>
                    </div>
                    <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                        <li class="el-menu-item" @click="$router.push(item.path+'/'+item.children[0].path)">{{item.children[0].name}}</li>
                    </ul>
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
      data() {
          return {
              fromMenuPath: this.$route.path
          }
      },
      computed: {
        ...mapGetters([
          'permission_routers',
          'sidebar'
        ])
      },
      methods: {
         flushCom(event,topath){
            event.preventDefault();
            event.stopPropagation();
            // 菜单强制刷新
            // console.log(this.fromMenuPath)
            // console.log(this.$route)
            console.log(this.$route.path)
            if (this.fromMenuPath == topath){
              this.$router.push({ path: topath, query: { "_t": Date.parse(new Date()) }})
            }
            this.fromMenuPath = topath;
            return false;
        },
        showMenu(i, status) {
            // console.log(this.$refs.menuCollapsed)
            this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
        }

      }
    }
</script>
 
 <style lang="less" scoped>
 i.sidebar_icon{
   margin-right: 16px;
 }
 .el-menu{
     .el-menu-item{
         padding: 0;
         a{
             display: block;
             padding: 0 20px;
         }
     }
     .second_item{
         a{
             padding-left: 40px;
         }
     }
 }
 .sidebar_wrapper{
    width: 230px;
    z-index: 999;
    transition: all .2s ease-out;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    &>.el-menu{
        height: 100%;
        border-radius: 0;
    }
    .collapsed{
        width: 0;
        display: none;
        position: absolute;
        right: 0;
        top: 0;
        background-color: #324157;
        .el-submenu {
            position: relative;
            .el-submenu__title {
                position: relative;
                color: #a8a8a8;
                padding: 0 14px;
                &:hover, &.is-active {
                    background: #00adef;
                    color: #ffffff;
                }
            }
        }
        .submenu {
            position: absolute;
            top: 0px;
            left: 40px;
            z-index: 99999;
            height: auto;
            display: none;
            .el-menu-item{
                padding: 0 30px;
                height: 56px;
                line-height: 56px;
            }
        }
    }
    &.hideSidebar{
        transform: translate(-190px, 0);
        .no_collapsed{
            transform: translate(-40px, 0);
        }
        .collapsed{
            width: 40px;
            display: block;
        }
    }
}
 </style>
 