<template>
<div class="profile">
  <Nav @input:change="inputChange" />
  <div class="searchContainer" v-if="this.input.length >= 1">
    <Heading v-bind:title="this.input" v-bind:search="true" v-bind:profile="true" />
    <SearchList :input=this.input />
  </div>

    <h1>User</h1>
    <h2>Settings</h2>

  <div v-if="elements.length>0">
    <ul>
      <Heading v-bind:title="titles[0]" v-bind:search="false" v-bind:profile="true" />
      <li v-for="element in elements" v-bind:key="element.id">
        <WatchLater class="WatchLater" v-bind:element=element />
      </li>
    </ul>
    <div v-for="element in this.elements" :key="element.id">
      <Information v-bind:id="element.id" v-bind:identity="element.id" v-bind:movie="element.hasOwnProperty('title')"
                   @hide:info="changeInfoVisibility"/>
    </div>
  </div>
  <div v-else class="container">
    <ul>
      <Heading v-bind:title="titles[0]" v-bind:search="false" />
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
      titles: [
        'Watch Later'
      ]
    }
  },
  mounted() {
    if(this.$store.state.user === null){
      this.$router.push("/login");
    }
    let list = this.$store.state.dbList;
    console.log('list: '+ list)
    let url, movies = [];
    for(let i = 0; i < list.length; i++) {
      console.log(list[i].replace(/[0-9]/g, "") === "tv")
      if(list[i].replace(/[0-9]/g, "") === "tv"){
        console.log('TEEVEE')
        url = `https://api.themoviedb.org/3/tv/${list[i].replace(/\D/g, "")}?api_key=7a1108dafa3ea1ef83a43e999a63f38b&language=en-US&append_to_response=watch%2Fproviders`;
      } else {
        console.log('MUUVII')
        url = `https://api.themoviedb.org/3/movie/${list[i].replace(/\D/g, "")}?api_key=7a1108dafa3ea1ef83a43e999a63f38b&language=en-US&append_to_response=watch%2Fproviders`;
      }
      axios.get(url).then(res => {
        movies.push(res.data);
      }).catch(err => {
        console.log('Error ' + err);
      })
    }
    console.log('movies: '+movies)
    this.elements = movies;
    this.$store.state.movies = movies
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
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
.profile {
  font-family: 'Montserrat', sans-serif;
  background-color: #242323;
  min-height: 100vh;
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
  padding: 20px;
}
</style>