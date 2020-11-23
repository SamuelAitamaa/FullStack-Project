<template>
  <div class="searchList">
    <ul>
      <li v-for="element in this.elements" :key="element.id">
        <div class="search">
          <img v-bind:src="element.poster_path" alt="Placeholder image" />
          <div class="text">
            <h2>{{ element.title }}</h2>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "SearchList",
  data(){
    return {
      elements: []
    }
  },
  props: {
    input: String
  },
  watch: {
    input: function() {
      axios
      .get(`http://api.themoviedb.org/3/search/movie?query=${this.input}&api_key=7a1108dafa3ea1ef83a43e999a63f38b`)
      .then(res => {
        this.elements = res.data.results;
        this.elements.reduceRight(function (acc, item, index, object) {
          if(item.poster_path === null || item.poster_path === undefined){
            object.splice(index, 1);
          }else{
            item.poster_path = `http://image.tmdb.org/t/p/w300/${item.poster_path}`;
          }
        }, []);
      });
    }
  }
}
</script>

<style scoped>
ul{
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}
ul li{
  list-style-type: none;
  padding: 20px;
  user-select: none;
}

.search{
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 375px;
  position: relative;
}
.text{
  display: none;

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
  height: 100%;
}
</style>