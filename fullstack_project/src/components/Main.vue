
<template>
  <div class="main">
    <Nav @input:change="inputChange" />
    <div id="searchContainer">
      <Heading v-bind:title="this.input" v-bind:search="true" />
      <MovieList v-bind:input="this.input" v-bind:class="classes[0]"/>
    </div>
    <div id="mainContainer">
      <div v-for="(title, index) in this.titles" :key="title">
        <Heading v-bind:title="titles[index]" v-bind:search="false" />
        <MovieList v-bind:id="titles[index]" v-bind:genre="genres[index]" v-bind:class="classes[1]"/>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import MovieList from "@/components/MovieList";
import Heading from "@/components/Heading";

export default {
  name: "Main",
  components: {
    Nav,
    MovieList,
    Heading
  },
  data() {
    return {
      input: '',
      titles: [
          "Trending", "Horror", "Fantasy", "Comedy",
          "Drama", "Action", "Adventure",
          "Romance", "Documentary", "Crime"
      ],
      genres: [
          0, 27, 14, 35, 18, 28, 12, 10749, 99, 80
      ],
      classes: ["search", "frontpage"]
    }
  },
  watch:{
    input: function () {
      const main = document.getElementById('mainContainer');
      const search = document.getElementById('searchContainer');
      if(this.input.length >= 1){
        search.style.display = 'block';
        main.style.display = 'none';
      }else{
        search.style.display = 'none';
        main.style.display = 'block';
      }
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
  min-height: 100vh;
}
#mainContainer, #searchContainer{
  padding: 20px;

  transition: .2s ease-in-out;
}
#searchContainer{
  display: none;
}

</style>