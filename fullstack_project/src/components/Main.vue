<template>
  <div class="main">
    <Nav @input:change="inputChange" />
    <div class="searchContainer" v-if="this.input.length >= 1">
      <header>
        <h1>Searching: {{ this.input }}</h1>
      </header>
    </div>
    <div class="mainContainer" v-if="this.input.length === 0">
      <header>
        <h1>Trending</h1>
      </header>
      <MovieList class="trending" v-bind:genre=0 />
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
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import MovieList from "@/components/MovieList";

export default {
  name: "Main",
  components: {
    Nav,
    MovieList
  },
  data() {
    return {
      input: ''
    }
  },
  methods: {
    inputChange(emit){
      this.input = emit;
    }
  }
}
</script>

<style scoped>
.main{
  background: #242323;
}
.mainContainer, .searchContainer{
  padding: 20px 0 0 20px;

  transition: .2s ease-in-out;
}
header{
  text-align: left;
  color: white;
  padding: 20px;
}

</style>