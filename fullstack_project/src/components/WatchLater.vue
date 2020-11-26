<template>
  <div class="WatchLater">
    <ul v-dragscroll.x>
      <li>
        <div class="text">
        <h2>{{ this.title }}</h2>
        </div>
        <div class="movie">
          <img v-bind:src="this.image" alt="Placeholder image" />
          <button v-if="!checkList(id)" @click="addToList(id)" class="plus">+</button>
          <button v-else @click="deleteFromList(id)" class="plus">-</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { dragscroll } from 'vue-dragscroll';

export default {
  name: "WatchLater",
  directives: {
    dragscroll
  },
  data(){
    return {
      title: '',
      image: '',
    }
  },
  props: {
    input: String,
    id: Number
  },

    created: function() {
      axios
          .get(`https://api.themoviedb.org/3/movie/${this.id}?api_key=7a1108dafa3ea1ef83a43e999a63f38b&language=en-US`)
          .then(res => {
            this.image = `http://image.tmdb.org/t/p/w300/${res.data.poster_path}`;
            this.title = res.data.title;
            this.id = res.data.id;
          });
    },
  methods: {
    addToList(id) {
      this.$store.commit("newId", id)
    },
    checkList(id) {
      let store = JSON.stringify(this.$store.state.movies)
      return store.includes(id)
    },
    deleteFromList(id) {
      this.$store.commit("deleteID", id)
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
  text-align: left;
  color: white;
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