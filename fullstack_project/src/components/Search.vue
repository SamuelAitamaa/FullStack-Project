<template>
  <div class="search">
    <img v-bind:src="image" alt="Placeholder image" />
    <div class="text">
      <h2>{{ title }}</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Search",
  data() {
    return {
      image: '',
      title: ''
    };
  },
  props: {
    index: String,
    query: String
  },
  watch: {
    query: function () {
        axios
        .get(`http://api.themoviedb.org/3/search/movie?query=${this.query}&api_key=7a1108dafa3ea1ef83a43e999a63f38b`)
        .then(res => {
          this.image = `http://image.tmdb.org/t/p/w300/${res.data.results[this.index].poster_path}`;
          this.title = res.data.results[this.index].title;
        });
    }
  }
}

</script>

<style scoped>
.search{
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 375px;
  position: relative;
}
.text{
  display: none;

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
  height: 100%;
}
</style>