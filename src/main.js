// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'babel-polyfill'
import ElementUi from 'element-ui'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css';
import { getToken, removeToken } from './utils/utils'

Vue.use(ElementUi)

Vue.config.productionTip = false //关闭生产模式下给出的提示

let whitelist = ['/home'];
router.beforeEach((to, from, next) => {
  if(getToken()) {
    if(to.path === '/home') {
      next({path: '/'});
    } else {
      if(store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          // console.log(res.data.RoleName)
          const roles = res.data.RoleName;
          // const roles = '管理员';
          store.dispatch('GenerateRouters', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters);
            let key = localStorage.getItem("isFirst");
            if(key == 'yes') {
              console.log(key)
              next({path: '/index'});
              localStorage.removeItem("isFirst")
             } else {
              next(to.path);
            }
          })
        }).catch(err => {
          if (err.response){
            if (err.response.status == 500){
              Message({
                    message: "获取用户信息授权错误，请重新登录啊啊！",
                    type: 'error',
                    duration: 5 * 1000
                  });
              store.commit('SET_TOKEN', '');
              store.commit('SET_ROLES', []);
              removeToken();
              next('/home');
            }
          }
        })
      } else {
        next();
      }
    }
  } else {
    if (whitelist.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/home');
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
