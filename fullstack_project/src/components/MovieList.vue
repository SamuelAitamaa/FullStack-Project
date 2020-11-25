<template>
  <div class="movieList">
    <ul v-dragscroll.x>
      <li v-for="element in this.elements" :key="element.id">
        <div class="movie">
          <img v-bind:src="element.poster_path" alt="Placeholder image" />
          <button v-if="checkList(element.id)===false" @click="addToList(element.id)" class="plus">+</button>
          <button v-else-if="checkList(element.id)===true" @click="deleteFromList(element.id)" class="plus">-</button>
          <div class="text">
            <h2>{{ element.title }} {{ element.name }}</h2>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll';
import axios from "axios";

export default {
  name: "MovieList",
  directives: {
    dragscroll
  },
  data(){
    return {
      elements: []
    }
  },
  props: {
    genre: Number
  },
  methods: {
    addToList(id) {
      this.$store.commit("newId", id)
      console.log(id)
    },
    checkList(id) {
      let store = JSON.stringify(this.$store.state.movies)
      return store.includes(id)
    },
    deleteFromList(id) {
      this.$store.commit("deleteID", id)
    }
  },

  created: function() {
    if(this.genre === 0){
      axios
        .get(`https://api.themoviedb.org/3/trending/all/day?api_key=7a1108dafa3ea1ef83a43e999a63f38b`)
        .then(res => {
          this.elements = res.data.results;
          this.elements.reduceRight(function (acc, element, index, elements) {
            if(element.poster_path === null || element.poster_path === undefined){
              elements.splice(index, 1);
            }else{
              element.poster_path = `http://image.tmdb.org/t/p/w300/${element.poster_path}`;
            }
          }, []);
        });
    }else{
      axios
        .get(`http://api.themoviedb.org/3/movie/popular?with_genres=${this.genre}&api_key=7a1108dafa3ea1ef83a43e999a63f38b`)
        .then(res => {
          this.elements = res.data.results;
          this.elements.reduceRight(function (acc, element, index, elements) {
            if(element.poster_path === null || element.poster_path === undefined){
              elements.splice(index, 1);
            }else{
              element.poster_path = `http://image.tmdb.org/t/p/w300/${element.poster_path}`;
            }
          }, []);
        });
    }
  }
}
</script>

<style scoped>
ul{
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
  overflow-x: scroll;
  scroll-behavior: smooth;

  transition: .2s ease-in-out;
}
ul:hover{
  scroll-behavior: revert;
}
ul:active{
  transform: scale(1.02);
}
ul::-webkit-scrollbar{
  width: 0;
}
ul li{
  list-style-type: none;
  padding: 20px;
}

.movie{
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 375px;
  position: relative;
}
.text{
  transform: scale(0);

  display: /*flex*/none;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;

  text-align: center;
  color: black;
  background: rgb(245, 212, 122);

  transition: .2s ease-in-out;
}
.plus{
  transform: scale(0);

  color: #ebb446;
  font-size: 36px;
  font-weight: bolder;

  height: 50px;
  width: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: black;
  border: none;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 10px;

  transition: .2s ease-in-out;
}
.plus:hover{
  background-color: #ebb446;
  color: black;
}
.plus:active{
  background-color: #3dff2b;
}
.plus:focus{
  outline: none;
}
h2{
  padding: 5px 10px;
}
img{
  width: 100%;
  height: 100%;

  transition: .2s ease-in-out;
}
li:hover img{
  outline: 2px solid #ebb446;
}
li:hover .text, li:hover .plus{
  transform: scale(1);
}
</style>