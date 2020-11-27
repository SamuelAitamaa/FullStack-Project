<template>
  <div class="searchList">
    <ul>
      <li v-for="element in this.elements" :key="element.id">
        <div class="search">
          <img v-bind:src="element.poster_path" alt="Placeholder image" v-on:click="changeInfoVisibility(element.id)"/>
          <button v-if="!checkList(element.id)" @click="addToList(element.id)" class="imgBtn">+</button>
          <button v-else @click="deleteFromList(element.id)" class="imgBtn">-</button>
          <Information
                  v-bind:id="element.id"
                  v-bind:identity="element.id"
                  v-bind:movie="element.hasOwnProperty('title')"
                  @hide:info="changeInfoVisibility"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Information from '@/components/Information';
import axios from 'axios';

export default {
  name: "SearchList",
  components: {
    Information
  },
  data(){
    return {
      elements: [],
      infoVisible: false
    }
  },
  props: {
    input: String
  },
  watch: {
    input: function() {
      if(this.input.length > 0){
        axios
            .get(`http://api.themoviedb.org/3/search/multi?query=${this.input}&api_key=7a1108dafa3ea1ef83a43e999a63f38b`)
            .then(res => {
              this.elements = res.data.results;
              this.elements.reduceRight(function (acc, element, index, elements) {
                if(element.poster_path === null || element.poster_path === undefined){
                  elements.splice(index, 1);
                }else{
                  element.poster_path = `http://image.tmdb.org/t/p/w300/${element.poster_path}`;
                }
              }, []);
            });
      }
    }
  },
  methods: {
    changeInfoVisibility: function (id) {
      this.infoVisible = !this.infoVisible;
      let element = document.getElementById(id);
      if(this.infoVisible){
        element.style.display = 'block';
      }else{
        element.style.display = 'none';
      }
    },
    addToList(id) {
      this.$store.commit("newId", id)
    },
    checkList(id) {
      let store = JSON.stringify(this.$store.state.movies)
      return store.includes(id)
    },
    deleteFromList(id) {
      this.$store.commit("deleteID", id)
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
}

.search{
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 375px;
  position: relative;
}
.imgBtn{
  transform: scale(0);

  color: #ebb446;
  font-size: 36px;
  font-weight: bolder;

  height: 50px;
  width: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: black;
  border: none;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 10px;

  transition: .2s ease-in-out;
}
.imgBtn:hover{
  background-color: #ebb446;
  color: black;
}
.imgBtn:active{
  background-color: #3dff2b;
}
.imgBtn:focus{
  outline: none;
}
h2{
  padding: 5px 10px;
}
img{
  width: 100%;
  height: 100%;

  transition: .2s ease-in-out;
}
li:hover img{
  outline: 2px solid #ebb446;
}
li:hover .imgBtn{
  transform: scale(1);
}
</style>