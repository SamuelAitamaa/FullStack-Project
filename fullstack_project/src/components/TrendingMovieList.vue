<template>
  <div class="container">
    <ul>
      <li><TrendingMovie index=0 /></li>
      <li><TrendingMovie index=1 /></li>
      <li><TrendingMovie index=2 /></li>
      <li><TrendingMovie index=3 /></li>
      <li><TrendingMovie index=4 /></li>
      <li><TrendingMovie index=5 /></li>
    </ul>
  </div>
</template>

<script>
import TrendingMovie from "@/components/TrendingMovie";

export default {
  name: "TrendingMovieList",
  components: {
    TrendingMovie
  },
  props: {
    genre: String
  }
}
</script>

<style scoped>
ul{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
ul li{
  list-style-type: none;
}
</style>