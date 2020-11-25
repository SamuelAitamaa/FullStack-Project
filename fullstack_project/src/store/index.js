import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        movies: []
    },
    getters: {
        checkList: (state) => (id) => {
            return state.movies(id)
        }
    },
    mutations: {
        newId(state, payload) {
            state.movies.push({id: payload})
        },
        deleteID(state, payload) {
            state.movies.splice({id: payload}, 1)
        }
    },
    actions: {}
});