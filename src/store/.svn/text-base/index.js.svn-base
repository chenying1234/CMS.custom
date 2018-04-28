import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import clientAdminMg from './modules/clientMag'
import framewordContractMag from './modules/frameworkContractMag'
import contractMag from './modules/contractMag'
import payMag from './modules/payMag'
import incomeMag from './modules/incomeMag'


import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        permission,
        clientAdminMg,
        framewordContractMag,
        contractMag,
        payMag,
        incomeMag
    },
    getters
});

export default store