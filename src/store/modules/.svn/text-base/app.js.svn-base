import Cookies from 'js-cookie'

const app = {
    state: {
        sidebar: {
            opened: !+Cookies.get('sidebarStatus')
        },
        theme: 'default',
        livenewsChannels: Cookies.get('livenewsChannels') || '[]'
    },
    mutations: {
        TOGGER_SIDEBAR: state => {
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
            state.sidebar.opened = !state.sidebar.opened
        }
    },
    actions: {
        ToggerSidebar: ({commit}) => {
            commit('TOGGER_SIDEBAR');
        }
    }
}

export default app