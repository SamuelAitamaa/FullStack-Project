import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        movies: []
    },
    getters: {},
    mutations: {
        newId(state, payload) {
            state.movies.push({id: payload})
        }
    },
    actions: {}
});