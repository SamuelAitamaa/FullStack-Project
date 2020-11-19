<template>
  <div class="container">
    <ul>
      <li><Movie index=0 v-bind:genre="this.genre" /></li>
      <li><Movie index=1 v-bind:genre="this.genre" /></li>
      <li><Movie index=2 v-bind:genre="this.genre" /></li>
      <li><Movie index=3 v-bind:genre="this.genre" /></li>
      <li><Movie index=4 v-bind:genre="this.genre" /></li>
      <li><Movie index=5 v-bind:genre="this.genre" /></li>
    </ul>
  </div>
</template>

<script>
import Movie from "@/components/Movie";

export default {
  name: "MovieList",
  components: {
    Movie
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