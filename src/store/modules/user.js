import { login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/utils'
import router from '@/router'
import Cookies from 'js-cookie'

const user = {
    state: {
        token: getToken(),
        userName: '',
        avatar: '',
        roles: []
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USERNAME: (state, userName) => {
            state.userName = userName;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        }
    },

    actions: {
        // 登录
        Login({commit}, userInfo) {
            const accountName = userInfo.accountName.trim();
            const password = userInfo.password.trim();
            return new Promise((resolve, reject) => {
                login(accountName, password).then(res => {
                    // console.log(res.data.Message)
                    if(res.data.Result){
                        setToken(res.data.Message);
                        commit('SET_TOKEN', res.data.Message);
                        //建立localStorage 方便之后判断
                        localStorage.setItem("isFirst","yes");
                    }
                    resolve(res);
                }).catch(err => {
                    console.log('调用登录接口失败')
                    reject(err);
                })
            })
        },
        //获取用户信息
        GetInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getInfo(state.token).then(res => {
                    commit('SET_USERNAME', res.data.UserName);
                    commit('SET_ROLES', [res.data.RoleName]);
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        // 前端 退出账号
        FedLoginOut({ commit }) {
            return new Promise(resolve => {
                removeToken();
                commit('SET_TOKEN', '');
                commit('SET_ROLES', []);
                Cookies.set('sidebarStatus', 0)
                router.push({path:'/login'});
                resolve();
            });
        }
    }
}

export default user