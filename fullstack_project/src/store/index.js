import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        movies: [],
        dbList: [],
        user: null
    },
    plugins: [createPersistedState({
            storage: window.sessionStorage
    })],
    mutations: {
        /**
         * The "logged in" state is tracked with the user variable. If the user variable is null, the user is not
         * logged in. Once the user has a username and a id, then the user is considered "logged in".
         * @param{object} state is the current state of the application
         * @param{object} payload is the object (user) which will "log in" the user to the site
         */
        user(state, payload){
            state.user = payload;
            console.log('Mutation in user: ' + state.user)
        },
        /**
         * The "logged off" state is tracked with the user variable. If the user variable is null, the user is not
         * logged in. Once the user has a username and a id, then the user is considered "logged in".
         * @param{object} state is the current state of the application
         */
        delUser(state){
            state.user = null;
            console.log('Mutation in user: ' + state.user)
        },
        /**
         * Saves the ids and type of media from the database to this list. This list will provide the Profile screen
         * the correct information it needs to render the current logged in users list.
         * @param{object} state is the current state of the application
         * @param{object} payload is the id and media type which will be saved
         */
        saveMediaList(state, payload){
            state.dbList = payload
        },
        /**
         * Saves the media to an (Vuex store) array, which will fasten the rendering of the media. Also saves the media
         * to the database by sending the media type, the media id and the current user id within a post request to the
         * database.
         * @param{object} state is the current state of the application
         * @param{object} payload is the element which hosts all the information about the media
         */
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
        /**
         * Deletes the media from both (Vuex store) arrays and makes a delete request to the database to delete media
         * from the current users list. Array deletion works with (item.id === payload.id).
         * @param{object} state is the current state of the application
         * @param{object} payload is the object which need to be deleted from the arrays
         */
        deleteMedia(state, payload) {
            let index, id;
            state.movies.find(function(item, i){
                if(item.id === payload.id){
                    id = item.id;
                    index = i;
                    return i;
                }
            });
            state.movies.splice(index, 1)
            state.dbList.splice(index, 1);
            let url;
            try {
                url = 'http://localhost:8081/backend/deletefromdb'
                axios.delete(url, {
                    data: {
                        media_id: id,
                        user_id: state.user[0]
                    }
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
        /**
         * Deletes the media from both (Vuex store) arrays and makes a delete request to the database to delete media
         * from the current users list. Array deletion works with (item.id === payload).
         * @param{object} state is the current state of the application
         * @param{number} payload is the id of the object which need to be deleted from the arrays
         */
        deleteFromProfile(state, payload) {
            let index, id;
            state.movies.find(function(item, i){
                if(item.id === payload){
                    id = item.id;
                    index = i;
                    return i;
                }
            });
            state.movies.splice(index, 1)
            state.dbList.splice(index, 1)
            let url;
            try {
                url = 'http://localhost:8081/backend/deletefromdb'
                axios.delete(url, {
                    data: {
                        media_id: id,
                        user_id: state.user[0]
                    }
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
});