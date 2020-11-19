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
    let one = `https://jsonplaceholder.typicode.com/photos/${Math.ceil(Math.random() * 500)}`
    let trendingMovies = "https://api.themoviedb.org/3/trending/all/week?api_key=7a1108dafa3ea1ef83a43e999a63f38b"

    const requestOne = axios.get(one);
    const requestTwo = axios.get(trendingMovies);


    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
      const responseOne = responses[0].data
      const trendingTitles = responses[1].data.results[0].original_title
      //const trendingImages = "https://image.tmdb.org/t/p/original" + responses[1].data.results[0].poster_path
      //console.log(trendingImages)
      console.log(trendingTitles)
      //this.image = trendingImages
      this.title = trendingTitles
      // use/access the results
      this.image = responseOne;
    })).catch(errors => {
      console.log(errors)
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