import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        movies: [],
        loggedIn: true
    },
    getters: {},
    mutations: {
        newId(state, payload) {
            state.movies.push({id: payload})
        },
        deleteID(state, payload) {
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