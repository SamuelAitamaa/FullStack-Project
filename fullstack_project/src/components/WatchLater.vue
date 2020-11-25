<template>
  <div class="WatchLater">
    <ul>
      <li>
        <div class="movie">
          <h2>{{ this.title }}</h2>
          <img v-bind:src="this.image" alt="Placeholder image" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "WatchLater",
  data(){
    return {
      title: '',
      image: ''
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
    }
}
</script>

<style scoped>

ul{
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
}
ul li{
  list-style-type: none;
  padding: 20px;
  user-select: none;
}

.movie{
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

h1, h2{
  text-align: left;
  color: white;
  padding: 30px;
}
h2{
  padding: 5px 10px;
}
img{
  width: 100%;
  height: 100%;
}
</style>