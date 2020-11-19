<template>
  <div class="movie">
    <img v-bind:src="image" alt="Placeholder image" />
    <div class="text">
      <h2>{{ title }}</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Movie",
  data() {
    return {
      image: '',
      title: ''
    };
  },
  props: {
    index: String,
    genre: String
  },
  created: function() {
    axios
        .get(`http://api.themoviedb.org/3/movie/popular?with_genres=${this.genre}&api_key=7a1108dafa3ea1ef83a43e999a63f38b`)
        .then(res => {
          this.image = `http://image.tmdb.org/t/p/w300/${res.data.results[this.index].poster_path}`;
          this.title = res.data.results[this.index].title;
        });
  }
}
</script>

<style scoped>
.movie{
  display: flex;
  flex-direction: column;
  max-width: 250px;
  position: relative;
}
.text{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;

  text-align: center;
  color: white;
  background: rgba(69, 65, 65, .5);
}
h2{
  padding: 5px 10px;
}
img{
  width: 100%;
}
</style>