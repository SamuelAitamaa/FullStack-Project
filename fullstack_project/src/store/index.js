import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        movies: [],
        user: Object
    },
    plugins: [createPersistedState({
            storage: window.localStorage
    })],
    getters: {},
    mutations: {
        user(state, payload){
            state.user = payload;
            console.log(state.user)
        },
        delUser(state){
            state.user = null;
            console.log(state.user)
        },
        saveMedia(state, payload) {
            state.movies.push(payload)
            let url;
            try {
                url = 'http://localhost:8081/backend/savetodb'
                console.log(url)
                axios.post(url, {
                    headers: {},
                    media_id: payload.id,
                    media_type: payload.media_type,
                    user_id: state.user[0]
                }).then(res => {
                    console.log(res);
                    if(res.data === "Success"){
                        console.log('Saving media to db complete!');
                    }else{
                        console.log('Saving media to db was unsuccessful.');
                    }
                }).catch(err => {
                    console.log(err.response);
                });
            } catch (error) {
                console.log('Error in async: ' + error);
            }
        },
        deleteMedia(state, payload) {
            let index, id;
            state.movies.find(function(item, i){
                if(item.id === payload.id){
                    id = item.id;
                    index = i;
                    return i;
                }
            });
            state.movies.splice(index, 1);
            let url;
            try {
                url = 'http://localhost:8081/backend/deletefromdb'
                console.log(url)
                axios.delete(url, {
                    data: { media_id: id }
                }).then(res => {
                    console.log(res);
                    if(res.data === "Success"){
                        console.log('Deleting media from db complete!');
                    }else{
                        console.log('Deleting media from db was unsuccessful.');
                    }
                }).catch(err => {
                    console.log(err.response);
                });
            } catch (error) {
                console.log('Error in async: ' + error);
            }
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