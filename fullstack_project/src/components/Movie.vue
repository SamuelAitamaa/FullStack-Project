<template>
  <div class="movie">
    <img v-bind:src="image.url" alt="Placeholder image" />
    <div class="text">
      <h2>Movie Title</h2>
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
    };
  },
  created: function() {
    axios
    .get(`https://jsonplaceholder.typicode.com/photos/${Math.ceil(Math.random() * 500)}`)
    .then(res => {
      this.image = res.data;
    })
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
  height: 40px;

  text-align: left;
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