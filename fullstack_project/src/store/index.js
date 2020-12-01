import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import Axios from 'axios';

Vue.use(Vuex);

const getDefaultState = () => {
    return {
        token: '',
        user: {},
        movies: []
    };
};
export default new Vuex.Store({
    state: getDefaultState,
    plugins: [createPersistedState({
        //storage: window.sessionStorage,
        key: 'lol'
    })],
    getters: {
        isLoggedIn: state => {
            return state.token;
        },
        getUser: state => {
            return state.user;
        }
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USER: (state, user) => {
            state.user = user;
        },
        RESET: state => {
            Object.assign(state, getDefaultState());
        },
        newId(state, payload) {
            state.movies.push(payload)
        },
        deleteID(state, payload) {
            let index
            state.movies.find(function(item, i){
                if(item.id === payload.id){
                    index = i;
                    return i;
                }
            });
            state.movies.splice(index, 1)
        },
        deleteFromProfile(state, payload) {
            let index
            state.movies.find(function(item, i){
                if(item.id === payload){
                    index = i;
                    return i;
                }
            });
            state.movies.splice(index, 1)
        }
    },
    actions: {
        login: ({ commit, dispatch }, { token, user }) => {
            commit('SET_TOKEN', token);
            commit('SET_USER', user);
            // set auth header
            Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log(dispatch);
        },
        logout: ({ commit }) => {
            commit('RESET', '');
        }
    }
});