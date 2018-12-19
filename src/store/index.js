import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX);

const key = 'user'
const isLogin = 'isLogin'
const store = new VueX.Store({
    state() {

        return {
            user: null,
            isLogin: '0' // 0:未登录
        }
    },
    getters: {
        getStorage: function(state) {
            if (!state.user) {
                state.user = JSON.parse(localStorage.getItem(key))
                state.isLogin = localStorage.getItem(isLogin)
            }
            return state.user
        }

    },
    mutations: {
        setLogin(state, value) {
            state.isLogin = value;
            localStorage.setItem(isLogin, value)
        },
        setStorage(state, value) {
            state.user = value
            localStorage.setItem(key, JSON.stringify(value))
        },
        removeStorage() {
            state.user = null
            localStorage.removeItem(key)
        },
    },


});
export default store