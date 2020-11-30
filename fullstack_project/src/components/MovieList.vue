<template>
  <div class="movieList">
    <ul>
      <li v-for="element in this.elements" :key="element.id">
        <MediaElement v-bind:data="element" />
      </li>
    </ul>
  </div>
</template>

<script>
import MediaElement from "@/components/MediaElement";
import axios from "axios";

export default {
  name: "MovieList",
  components: {
    MediaElement
  },
  data(){
    return {
      elements: [],
    }
  },
  props: {
    genre: Number,
    input: String,
  },
  created: function() {
    if(this.genre === 0){
      let reqOne = axios.get(`https://api.themoviedb.org/3/trending/all/week?page=1&api_key=7a1108dafa3ea1ef83a43e999a63f38b`);
      let reqTwo = axios.get(`https://api.themoviedb.org/3/trending/all/week?page=2&api_key=7a1108dafa3ea1ef83a43e999a63f38b`);
      let reqThree = axios.get(`https://api.themoviedb.org/3/trending/all/week?page=3&api_key=7a1108dafa3ea1ef83a43e999a63f38b`);
      axios.all([reqOne, reqTwo, reqThree]).then(axios.spread((...res) => {
        res[0].data.results.forEach(element => this.elements.push(element));
        res[1].data.results.forEach(element => this.elements.push(element));
        res[2].data.results.forEach(element => this.elements.push(element));
        this.setImages(this.elements);
      }))
    }else{
      let reqOne = axios.get(`http://api.themoviedb.org/3/movie/popular?with_genres=${this.genre}&api_key=7a1108dafa3ea1ef83a43e999a63f38b`);
      let reqTwo = axios.get(`http://api.themoviedb.org/3/tv/popular?with_genres=${this.genre}&api_key=7a1108dafa3ea1ef83a43e999a63f38b`);
      axios.all([reqOne, reqTwo]).then(axios.spread((...res) => {
        res[0].data.results.forEach(element => this.elements.push(element));
        res[1].data.results.forEach(element => this.elements.push(element));
        this.shuffle(this.elements);
        this.setImages(this.elements);
      }))
    }
  },
  watch: {
    input: function() {
      if(this.input.length > 0){
        axios
          .get(`http://api.themoviedb.org/3/search/multi?query=${this.input}&api_key=7a1108dafa3ea1ef83a43e999a63f38b`)
          .then(res => {
            this.elements = res.data.results;
            this.setImages(this.elements);
          });
      }
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
.search ul{
  flex-wrap: wrap;
}
ul::-webkit-scrollbar{
  width: 0;
}
ul li{
  list-style-type: none;
  padding: 20px;

  transition: .2s ease-in-out;
}
</style>