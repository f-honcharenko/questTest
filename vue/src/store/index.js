import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
        token: localStorage.getItem('token') || '',
        user: {},

    },
    mutations: {
        auth_success(state, token) {  //лол, понятие не имею почему он не может принимать 2+ параметр0в, пока вынес в две отдельные мутации FIXIT
            state.isLoggedIn = true;
            state.token = token;
        },
        auth_success_userWrite(state, user) {
            state.user = user;
        }
    },
    actions: {
        login({ commit }, candidate) {
            console.log(document.domain);
            console.log(candidate);
            axios.post("http://" + document.domain + ":5000/login", candidate).then(
                (res) => {
                    if (res.status == 200) {
                        localStorage["token"] = res.data.token;
                        commit('auth_success', res.data.token,);
                        commit('auth_success_userWrite', res.data.user);
                        console.log(res.data.user);
                    }
                    alert(res.data.title);
                    console.log(res);
                },
                (err) => {
                    console.log(err.response);
                    alert(err.response.data.message);
                }
            );
        }
    },
    getters: {
        isLoggedInGetter: (state) => {
            return state.isLoggedIn;
        },

        isUserGetter: (state) => {
            return state.user;
        },
    }
})