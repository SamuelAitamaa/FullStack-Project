<template>
<div class="profile">
  <Nav @input:change="inputChange" />

  <div class="searchContainer" v-if="this.input.length >= 1">
    <Heading v-bind:title="this.input" v-bind:search="true" v-bind:profile="true" />
    <SearchList :input=this.input
                @update:list="renderList()"
    />
  </div>

  <h1 v-if="this.$store.state.user !== null">Welcome, {{ this.$store.state.user[1] }}</h1>
  <div id="nav">
    <div class="navItem">
      <router-link to="/changepassword">Change password</router-link><span> | </span>
      <router-link to="/changeusername">Change username</router-link>
    </div>
    <div class="navItem">
      <button @click="hideAreYouSure" v-if="!areyousure">Delete user</button>
      <div class="areYouSure" v-if="areyousure">
        <p>Are you sure?</p>
          <div class="confirmUserDel">
            <button id="yesBtn" @click="deleteUser">Yes</button>
            <button @click="hideAreYouSure">No</button>
          </div>
      </div>
    </div>
  </div>

  <div v-if="elements.length > 0">
    <Heading v-bind:title="this.title" v-bind:search="false" v-bind:profile="true" />
    <ul>
      <li v-for="element in elements" v-bind:key="element.id">
        <WatchLater v-bind:element=element @del:element="getListFromDb(this.$store.state.user[0])"/>
      </li>
    </ul>
    <div v-for="element in this.elements" :key="element.id">
      <Information v-bind:id="element.id" v-bind:identity="element.id"
                   v-bind:movie="element.hasOwnProperty('title')"
                   @hide:info="changeInfoVisibility"
      />
    </div>
  </div>

  <div v-else>
    <Heading v-bind:title="this.title" v-bind:search="false" v-bind:profile="true" />
    <ul>
      <li>
        <h2>It seems empty here. Get started by adding movies to your watch list!</h2>
      </li>
    </ul>
  </div>

</div>
</template>

<script>
import WatchLater from "@/components/WatchLater";
import Nav from "@/components/Nav";
import Heading from "@/components/Heading";
import Information from "@/components/Information";
import SearchList from "@/components/SearchList";
import axios from 'axios';
export default {
  name: "Profile",
  components: {
    WatchLater,
    Nav,
    Heading,
    Information,
    SearchList
  },
  data() {
    return {
      input: '',
      elements: {},
      title: 'Watch Later',
      areyousure: false,
      username: ''
    }
  },
  /**
   * Profile "created" function redirects the user to the login screen, if the user is not logged in. If the user
   * is logged in, the function fetches the latest list that the user has and sets the users name on display.
   */
  created() {
    if(this.$store.state.user === null){
      this.$router.push("/login");
    }else{
      this.getListFromDb(this.$store.state.user[0]);
      this.username = this.$store.state.user[1]
    }
  },
  methods: {
    /**
     * Updates the variable input when a "@input:change" emit is caught
     * @param{string} emit is the result that will be put to the variable input
     */
    inputChange(emit){
      this.input = emit;
    },
    /**
     * Changes the information visibility of a media. Each movie and series will have their information printed
     * with them, but will not be displayed unless the user clicks on the image of the media. If information is
     * displayed, scrolling will be disabled. When the user closes the information screen, scrolling will be enabled.
     * @param{string} id of the media whose information will be displayed
     */
    changeInfoVisibility: function (id) {
      this.infoVisible = !this.infoVisible;
      let element = document.getElementById(id);
      if(this.infoVisible){
        element.style.display = 'block';
      }else{
        element.style.display = 'none';
      }
    },
    /**
     * Get the list from database depending on user id
     * @param{number} id of the user
     */
    getListFromDb(id) {
      let url;
      try {
        url = 'http://localhost:8081/backend/getList'
        axios.get(url, {
          params: {
            user_id: id
          }
        }).then(res => {
          if(res.data === "Error"){
            console.log('Didn\'t get anything from db');
          }else{
            console.log(res.data);
            let result = res.data;
            result = result.split(",");
            let alteredResult = [];
            result.forEach(element => alteredResult.push(element))
            console.log('Altered result from db: ' + alteredResult)
            this.$store.commit("saveMediaList", alteredResult)
            this.renderList();
          }
        }).catch(err => {
          console.log('Error in axios.get (getList): ' + err);
        });
      } catch (error) {
        console.log('Error in async: ' + error);
      }
    },
    /**
     * Renders the list on the profile by getting a list of ids from Vuex store which has all the ids of the media the
     * user has saved on his / her / their "Watch Later" list. The ids are saved to Vuex store from database.
     * With the ids this function makes API calls and sets the results to a Vuex list of "movies" (contains both movies
     * and series) and to an element array, which is passed to the WatchLater component where the information will
     * be displayed.
     */
    renderList() {
      console.log('Rendering list...')
      let list = this.$store.state.dbList;
      let url, movies = [];
      for(let i = 0; i < this.$store.state.dbList.length; i++) {
        if(list[i].replace(/[0-9]/g, "") === "tv"){
          url = `https://api.themoviedb.org/3/tv/${list[i].replace(/\D/g, "")}?api_key=7a1108dafa3ea1ef83a43e999a63f38b&language=en-US&append_to_response=watch%2Fproviders`;
        }
        if (list[i].replace(/[0-9]/g, "") === "movie") {
          url = `https://api.themoviedb.org/3/movie/${list[i].replace(/\D/g, "")}?api_key=7a1108dafa3ea1ef83a43e999a63f38b&language=en-US&append_to_response=watch%2Fproviders`;
        }
        axios.get(url).then(res => {
          movies.push(res.data);
        }).catch(err => {
          console.log('Error in list rendering: ');
          console.log(err)
        })
        console.log('List render result: '+ movies)
      }
      this.elements = movies;
      this.$store.state.movies = movies
    },
    /**
     * Hides the confirmation section after the user has clicked on "Delete user"
     */
    hideAreYouSure(){
      console.log("Deleting user..")
      this.areyousure=!this.areyousure;
    },
    /**
     * Deletes the user and all media with the users id from the database. At the same time redirects the user
     * back to the main page and sets the user as null (representing that the user is not logged in).
     */
    deleteUser(){
      try{
        let url='http://localhost:8081/backend/deleteuser'
        axios.delete(url, {
          data: { user_id: this.$store.state.user[0]
        }}).then(res => {
          console.log(res)
          if(res.data === 'Success'){
            console.log('User deleted successfully.')
            this.$store.commit('delUser')
            this.$router.push('/')
          }else{
            console.log('Failed to delete user.')
          }
        }).catch(err => {
          console.log('Error in axios.delete. (deleteuser): '+err)
        })
      }catch(err) {
        console.log('Error in async: '+err)
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
.profile {
  font-family: 'Montserrat', sans-serif;
  background: linear-gradient(to right, #171616, #242323, #171616);
  min-height: 100vh;
}
#nav {
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.navItem{
  margin: 0 20px;
  font-size: 18px;
  color: #ebb446;
}
.navItem:first-child{
  margin-right: auto;
}
#nav a {
  font-weight: bold;
  color: #ebb446;
  text-decoration: none;
}
#nav a.router-link-exact-active {
  color: #ebb446;
}
#nav a:hover{
  color: #bf4b91;
}

.areYouSure{
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  font-family: inherit;
  font-size: 18px;
  font-weight: bold;
  border: 2px grey;
  border-radius: 2px;
  float: left;
  color: #ebb446;
  background: none;
  cursor: pointer;
  padding: 10px;
}
button:hover {
  color: #bf4b91;
  background: none;
}
button:active{
  outline: none;
}
p{
  color: white;
}
.confirmUserDel{
  display: flex;
}
header{
  text-align: left;
  color: white;
  padding: 20px;
}
h1, h2{
  text-align: left;
  color: white;
  padding: 30px;
}
ul{
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}
li{
  width: 95%;
  height: 450px;
  padding: 30px;
}
@media screen and (max-width: 800px){
  ul{
    justify-content: center;
    align-items: center;
  }
  li{
    height: 500px;
    width: 300px;
  }
  .navItem:first-child{
    display: flex;
    flex-direction: column;
  }
  span{
    display: none;
  }
}
</style>