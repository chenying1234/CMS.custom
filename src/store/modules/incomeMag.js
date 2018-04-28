const incomeMag = {
    namespaced: true,
    state: {
        activeName: 'first',
    },

    mutations: {
        SET_ACTIVENAME:(state, activeName) => {
            state.activeName = activeName;
        },
    },

    getters: {
        activeName: state => state.activeName,
    }

};

export default incomeMag;