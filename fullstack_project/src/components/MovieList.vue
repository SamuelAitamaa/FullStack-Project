<template>
  <div class="container">
    <ul>
      <li><Movie/></li>
      <li><Movie/></li>
      <li><Movie/></li>
      <li><Movie/></li>
      <li><Movie/></li>
      <li><Movie/></li>
    </ul>
  </div>
</template>

<script>
import Movie from "@/components/Movie";

export default {
  name: "MovieList",
  components: {
    Movie
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