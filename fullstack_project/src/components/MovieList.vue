<template>
  <div class="movieList">
    <ul v-dragscroll.x>
      <li v-for="element in this.elements" :key="element.id">
        <div class="movie">
          <img v-bind:src="element.poster_path" alt="Placeholder image" v-on:click="changeInfoVisibility(element.id)"/>
          <button v-if="!checkList(element)" @click="addToList(element)" class="plus">+</button>
          <button v-else @click="deleteFromList(element)" class="plus">-</button>
          <div class="text">
            <h2>{{ element.title }} {{ element.name }}</h2>
          </div>
        </div>
      </li>
    </ul>
    <div v-for="element in this.elements" :key="element.id">
      <Information v-bind:id="element.id" v-bind:identity="element.id" v-bind:movie="element.hasOwnProperty('title')"
                   @hide:info="changeInfoVisibility"/>
    </div>
  </div>
</template>

<script>
import Information from "@/components/Information";
import { dragscroll } from 'vue-dragscroll';
import axios from "axios";
export default {
  name: "MovieList",
  components: {
    Information
  },
  directives: {
    dragscroll
  },
  data(){
    return {
      elements: [],
      infoVisible: false
    }
  },
  props: {
    genre: Number
  },
  created: function() {
    if(this.genre === 0){
      let one = `https://api.themoviedb.org/3/trending/all/week?page=1&api_key=7a1108dafa3ea1ef83a43e999a63f38b`;
      let two = `https://api.themoviedb.org/3/trending/all/week?page=2&api_key=7a1108dafa3ea1ef83a43e999a63f38b`;
      let three = `https://api.themoviedb.org/3/trending/all/week?page=3&api_key=7a1108dafa3ea1ef83a43e999a63f38b`;
      let reqOne = axios.get(one);
      let reqTwo = axios.get(two);
      let reqThree = axios.get(three);
      axios.all([reqOne, reqTwo, reqThree]).then(axios.spread((...res) => {
        res[0].data.results.forEach(element => this.elements.push(element));
        res[1].data.results.forEach(element => this.elements.push(element));
        res[2].data.results.forEach(element => this.elements.push(element));
        this.setImages(this.elements);
      }))
    }else{
      let one = `http://api.themoviedb.org/3/movie/popular?with_genres=${this.genre}&api_key=7a1108dafa3ea1ef83a43e999a63f38b`;
      let two = `http://api.themoviedb.org/3/tv/popular?with_genres=${this.genre}&api_key=7a1108dafa3ea1ef83a43e999a63f38b`;
      let reqOne = axios.get(one);
      let reqTwo = axios.get(two);
      axios.all([reqOne, reqTwo]).then(axios.spread((...res) => {
        res[0].data.results.forEach(element => this.elements.push(element));
        res[1].data.results.forEach(element => this.elements.push(element));
        this.shuffle(this.elements);
        this.setImages(this.elements);
      }))
    }
  },
  methods: {
    shuffle: function (array) {
      let index = array.length;
      while (index !== 0) {
        let rndIndex = Math.floor(Math.random() * index);
        index -= 1;
        let temp = array[index];
        array[index] = array[rndIndex];
        array[rndIndex] = temp;
      }
    },
    setImages: function (array) {
      array.reduceRight(function (acc, element, index, elements) {
        if(element.poster_path === null || element.poster_path === undefined){
          elements.splice(index, 1);
        }else{
          element.poster_path = `http://image.tmdb.org/t/p/w300/${element.poster_path}`;
        }
      }, []);
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
    addToList(element) {
      this.$store.commit("newId", element)
    },
    checkList(element) {
      let store = JSON.stringify(this.$store.state.movies)
      return store.includes(JSON.stringify(element.id)) && (store.includes(JSON.stringify(element.title)) || (store.includes(JSON.stringify(element.name))))
    },
    deleteFromList(element) {
      this.$store.commit("deleteID", element)
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