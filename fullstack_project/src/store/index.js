import Vue from "vue";
import Vuex from "vuex";
//import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        movies: [],
        user: Object
    },
    //plugins: [createPersistedState()],
    getters: {},
    mutations: {
        user(state, payload){
            state.user = payload;
            console.log(state.user)
        },
        delUser(state){
            state.user = null;
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
    actions: {}
});