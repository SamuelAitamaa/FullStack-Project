<template>
<div class="profile" v-on:load="renderList()">
  <Nav @input:change="inputChange" />

  <div class="searchContainer" v-if="this.input.length >= 1">
    <Heading v-bind:title="this.input" v-bind:search="true" v-bind:profile="true" />
    <SearchList :input=this.input @del:element="renderList()" @add:element="renderList()"/>
  </div>

  <h1 v-if="this.$store.state.user !== null">Welcome, {{ this.$store.state.user[1] }}</h1>
  <div id="nav">
    <div class="navItem">
      <router-link to="/changepassword">Change password</router-link>
    </div>
    <div class="navItem">
      <button @click="hideAreYouSure" v-if="!areyousure">Delete user</button>
      <div class="areyousure" v-if="areyousure">
        <p >Are you sure?</p>
          <div class="areyousurebtn">
        <button id="yesbtn" @click="deleteUser">Yes</button>
        <button @click="hideAreYouSure">No</button>
          </div>
      </div>
    </div>
  </div>

  <div v-if="elements.length > 0">
    <Heading v-bind:title="this.title" v-bind:search="false" v-bind:profile="true" />
    <ul>
      <li v-for="element in elements" v-bind:key="element.id">
        <WatchLater class="WatchLater" v-bind:element=element @del:element="renderList()"/>
      </li>
    </ul>
    <div v-for="element in this.elements" :key="element.id">
      <Information v-bind:id="element.id" v-bind:identity="element.id" v-bind:movie="element.hasOwnProperty('title')"
                   @hide:info="changeInfoVisibility"/>
    </div>
  </div>

  <div v-else class="container">
    <ul>
      <Heading v-bind:title="this.title" v-bind:search="false" v-bind:profile="true" />
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
      areyousure: false
    }
  },
  mounted() {
    if(this.$store.state.user === null){
      this.$router.push("/login");
    }else{
      this.getListFromDb(this.$store.state.user[0]);
    }
  },
  methods: {
    inputChange(emit){
      this.input = emit;
    },
    changeInfoVisibility: function (id) {
      this.infoVisible = !this.infoVisible;
      let element = document.getElementById(id);
      if(this.infoVisible){
        element.style.display = 'block';
      }else{
        element.style.display = 'none';
      }
    },
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
    hideAreYouSure(){
      console.log("Deleting user..")
      this.areyousure=!this.areyousure;
    },
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
  font-family: 'Montserrat', sans-serif;
}
.navItem{
  margin: 0 20px;
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
.container {
  min-height: 100%;
  background-color: #242323;
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
button {
  font-size: 19px;
  font-weight: bold;
  border: 2px grey;
  border-radius: 2px;
  float: left;
  background: #ebb446;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  padding: 10px;

}
button:hover {
  background: #bf4b91;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
p {
  margin-top: 10px;
  font-size: 20px;
  color: rgba(180, 151, 43, 0.83);
  font-weight: bold;
}
  .areyousurebtn{
    display: flex;
    align-items: center;
    justify-content: center;

  }
</style>