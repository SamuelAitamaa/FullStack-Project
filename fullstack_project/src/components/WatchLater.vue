<template>
  <div class="WatchLater">
    <ul>
      <li>
        <div class="container">

          <div class="movie">
            <img v-bind:src="this.image" alt="Placeholder image" v-on:click="changeInfoVisibility(id)" />
          </div>

          <button @click="deleteFromList(element.id)" class="imgBtn">-</button>

          <div class="aboutMovie">
            <h3>{{ this.title }} {{ this.name }}</h3>
            <p>{{ this.overview }}</p>
            <h3>Rating: {{this.rating}}</h3>
            <div class="providers" v-for="provider in this.providers" :key="provider.index">
              <p>{{provider.provider_name}}</p>
              <img class="logo" v-bind:src="`http://image.tmdb.org/t/p/original/${provider.logo_path}`" alt="Placeholder image" @click="openProvider(provider.provider_name)" />
            </div>
          </div>

        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "WatchLater",
  components: {},
  data(){
    return {
      title: '',
      name: '',
      image: '',
      overview: '',
      providers: [],
      rating: ''
    }
  },
  props: {
    input: String,
    element: Object,
  },
  created: function() {
    if(Object.prototype.hasOwnProperty.call(this.element, 'title')) {
      axios
          .get(`https://api.themoviedb.org/3/movie/${this.element.id}?api_key=7a1108dafa3ea1ef83a43e999a63f38b&language=en-US&append_to_response=watch%2Fproviders`)
          .then(res => {
            this.image = `http://image.tmdb.org/t/p/w300/${res.data.poster_path}`;
            this.title = res.data.title;
            this.id = res.data.id;
            this.rating = res.data.vote_average;
            this.overview = res.data.overview
            if(JSON.stringify(res.data["watch/providers"].results).includes("FI")) {
              this.providers = res.data["watch/providers"].results.FI.buy
            }
          });
    } else {
      axios
          .get(`https://api.themoviedb.org/3/tv/${this.element.id}?api_key=7a1108dafa3ea1ef83a43e999a63f38b&language=en-US&append_to_response=watch%2Fproviders`)
          .then(res => {
            this.image = `http://image.tmdb.org/t/p/w300/${res.data.poster_path}`;
            this.name = res.data.name;
            this.id = res.data.id;
            this.rating = res.data.vote_average;
            this.overview = res.data.overview
            if(JSON.stringify(res.data["watch/providers"].results).includes("FI")) {
              this.providers = res.data["watch/providers"].results.FI.flatrate
            }
          });
    }
  },
  methods: {
    addToList(element) {
      this.$store.commit("saveMedia", element)
    },
    deleteFromList(id) {
      this.$store.commit("deleteFromProfile", id)
      this.$emit("del:element");
    },
    changeInfoVisibility: function (id) {
      this.infoVisible = !this.infoVisible;
      let element = document.getElementById(id);
      if(this.infoVisible){
        element.style.display = 'block';
      }else{
        element.style.display = 'none';
      }
    },
    openProvider(provider) {
      window.open(`https://www.google.com/search?q=${provider}`, '_blank');
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
.WatchLater{
  display: flex;
  justify-content: left;
  margin-left: 40px;
  font-family: 'Montserrat', sans-serif;

}
ul{
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  overflow-x: scroll;
  scroll-behavior: smooth;
  transition: .2s ease-in-out;
}
.container{
  display: flex;
  flex-direction: row;
  justify-content: left;
  width: 60vw;
  height: auto;
  min-height: 475px;
  position:relative;
  outline: 2px solid #ebb446;
  margin: 20px;
  background: black;

}

ul:hover{
  scroll-behavior: revert;
}
ul::-webkit-scrollbar{
  width: 0;
}
ul li{
  list-style-type: none;
  padding: 20px;
}
.movie{
  display: flex;
  flex-direction: row;
  width: 1200px;
  height: 375px;
  position: relative;

}
.imgBtn{
  transform: scale(0);
  color: #ebb446;
  font-size: 36px;
  font-weight: bolder;
  height: 55px;
  width: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border: none;
  border-radius: 50%;
  position: absolute;
  top: 15px;
  right: 15px;
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
  text-align: left;
  color: white;
}
h3{
  padding: 20px 10px;
  text-align: center;
  color: white;
  font-size: 25px;
}
p{
  padding: 10px 10px;
  line-height: 140%;
  font-size: 20px;
}

.providers {
  display: inline-block;
  padding: 10px 10px;
  line-height: 100%;
}
img{
  height: 475px;
  transition: .2s ease-in-out;
}
img.logo{
  width: 45px;
  height: 45px;
}
.aboutMovie{
  color: #ebb446;
  background: linear-gradient(to right, black, #242323);
  justify-content: center;
  width: 800vw;
  height: auto;
  padding: 45px;

}
li:hover img{
  outline: 2px solid #ebb446;
}
li:hover .text, li:hover .imgBtn{
  transform: scale(1);
}
</style>