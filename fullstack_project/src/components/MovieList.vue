<template>
  <div class="container">
      <ul v-dragscroll.x>
        <li><Movie index=0 v-bind:genre=this.genre /></li>
        <li><Movie index=1 v-bind:genre=this.genre /></li>
        <li><Movie index=2 v-bind:genre=this.genre /></li>
        <li><Movie index=3 v-bind:genre=this.genre /></li>
        <li><Movie index=4 v-bind:genre=this.genre /></li>
        <li><Movie index=5 v-bind:genre=this.genre /></li>
        <li><Movie index=6 v-bind:genre=this.genre /></li>
        <li><Movie index=7 v-bind:genre=this.genre /></li>
        <li><Movie index=8 v-bind:genre=this.genre /></li>
        <li><Movie index=9 v-bind:genre=this.genre /></li>
        <li><Movie index=10 v-bind:genre=this.genre /></li>
        <li><Movie index=11 v-bind:genre=this.genre /></li>
        <li><Movie index=12 v-bind:genre=this.genre /></li>
        <li><Movie index=13 v-bind:genre=this.genre /></li>
        <li><Movie index=14 v-bind:genre=this.genre /></li>
        <li><Movie index=15 v-bind:genre=this.genre /></li>
      </ul>
  </div>
</template>

<script>
import Movie from "@/components/Movie";
import { dragscroll } from 'vue-dragscroll';

export default {
  name: "MovieList",
  components: {
    Movie
  },
  directives: {
    dragscroll
  },
  props: {
    genre: Number
  }
}
</script>

<style scoped>
ul{
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
  overflow-x: scroll;
}
ul::-webkit-scrollbar{
  width: 0;
}
ul li{
  list-style-type: none;
  padding: 20px;
  user-select: none;
}

</style>