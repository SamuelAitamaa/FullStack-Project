<template>
  <div class="main">
    <header>
      <h1>Trending</h1>
    </header>
    <MovieList class="trending" />
    <header>
      <h1>Horror</h1>
    </header>
    <MovieList class="horror" />
  </div>
</template>

<script>
import MovieList from "@/components/MovieList";

export default {
  name: "Main",
  components: {
    MovieList
  }
}
</script>

<style scoped>
.main{
  background: #242323;
  padding: 20px;
}
header{
  text-align: left;
  color: white;
  padding: 20px;
}

</style>