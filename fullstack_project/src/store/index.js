import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        movies: [],
        dbList: [],
        user: Object
    },
    plugins: [createPersistedState({
            storage: window.localStorage
    })],
    getters: {},
    mutations: {
        user(state, payload){
            state.user = payload;
            console.log('Mutation in user: ' + state.user)
        },
        delUser(state){
            state.user = null;
            console.log('Mutation in user: ' + state.user)
        },
        saveMediaList(state, payload){
            state.dbList = payload
        },
        saveMedia(state, payload) {
            state.movies.push(payload)
            let url;
            try {
                url = 'http://localhost:8081/backend/savetodb'
                if(payload.media_type === undefined && payload.title === undefined){
                    payload.media_type = "tv";
                }else if(payload.media_type === undefined && payload.name === undefined){
                    payload.media_type = "movie";
                }
                axios.post(url, {
                    headers: {},
                    media_id: payload.id,
                    media_type: payload.media_type,
                    user_id: state.user[0]
                }).then(res => {
                    if(res.data === "Success"){
                        console.log('Saving media to db complete!');
                    }else{
                        console.log('Saving media to db was unsuccessful.');
                    }
                }).catch(err => {
                    console.log('Error in axios.post (savetodb): ' + err);
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
            state.dbList.splice(index, 1);
            state.movies.splice(index, 1)
            let url;
            try {
                url = 'http://localhost:8081/backend/deletefromdb'
                axios.delete(url, {
                    data: { media_id: id }
                }).then(res => {
                    if(res.data === "Success"){
                        console.log('Deleting media from db complete!');
                    }else{
                        console.log('Deleting media from db was unsuccessful.');
                    }
                }).catch(err => {
                    console.log('Error in axios.delete (deletefromdb): ' + err);
                });
            } catch (error) {
                console.log('Error in async: ' + error);
            }
        },
        deleteFromProfile(state, payload) {

            let index, id;
            state.movies.find(function(item, i){
                if(item.id === payload){
                    id = item.id;
                    index = i;
                    return i;
                }
            });
            state.dbList.splice(index, 1)
            state.movies.splice(index, 1)
            let url;
            try {
                url = 'http://localhost:8081/backend/deletefromdb'
                axios.delete(url, {
                    data: { media_id: id }
                }).then(res => {
                    if(res.data === "Success"){
                        console.log('Deleting media from db complete!');
                    }else{
                        console.log('Deleting media from db was unsuccessful.');
                    }
                }).catch(err => {
                    console.log('Error in axios.delete (deletefromdb): ' + err);
                });
            } catch (error) {
                console.log('Error in async: ' + error);
            }
        }
    },
    actions: {}
});