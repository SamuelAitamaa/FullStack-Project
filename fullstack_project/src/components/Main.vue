<template>
  <div class="main">
    <header>
      <h1>Trending</h1>
    </header>
    <TrendingMovieList class="trending"/>
    <header>
      <h1>Horror</h1>
    </header>
    <MovieList class="horror" v-bind:genre=27 />
    <header>
      <h1>Fantasy</h1>
    </header>
    <MovieList class="fantasy" v-bind:genre=14 />
    <header>
      <h1>Comedy</h1>
    </header>
    <MovieList class="comedy" v-bind:genre=35 />
    <header>
      <h1>Drama</h1>
    </header>
    <MovieList class="drama" v-bind:genre=18 />
    <header>
      <h1>Action</h1>
    </header>
    <MovieList class="action" v-bind:genre=28 />
    <header>
      <h1>Adventure</h1>
    </header>
    <MovieList class="adventure" v-bind:genre=12 />
    <header>
      <h1>Romance</h1>
    </header>
    <MovieList class="romance" v-bind:genre=10749 />
    <header>
      <h1>Documentary</h1>
    </header>
    <MovieList class="documentary" v-bind:genre=99 />
    <header>
      <h1>Crime</h1>
    </header>
    <MovieList class="crime" v-bind:genre=80 />
  </div>
</template>

<script>
import MovieList from "@/components/MovieList";
import TrendingMovieList from "@/components/TrendingMovieList";

export default {
  name: "Main",
  components: {
    TrendingMovieList,
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