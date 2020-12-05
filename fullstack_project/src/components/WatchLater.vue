<template>
  <div class="container">

    <div class="backgroundGradient">
      <img class="backgroundImage" v-bind:src="this.image" alt="Background image"/>
    </div>

    <div class="mediaImg">
      <img v-bind:src="this.image" alt="Placeholder image" v-on:click="changeInfoVisibility(id)" />
    </div>

    <button @click="deleteFromList(element.id)" class="imgBtn">-</button>

    <div class="aboutMedia">
      <h2>{{ this.title }} {{ this.name }}</h2>
      <h3>Rating: {{ this.rating }}</h3>
      <p>{{ this.overview }}</p>
      <h3 v-if="providers !== null">Available in:</h3>
      <div class="providers">
        <div class="provider" v-for="provider in this.providers" :key="provider.index">
          <!--p>{{provider.provider_name}}</p-->
          <img class="logo" v-bind:src="`http://image.tmdb.org/t/p/original/${provider.logo_path}`"
               alt="Placeholder image"
               @click="openProvider(provider.provider_name)" />
        </div>
      </div>
    </div>

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
      providers: null,
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
.container{
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  text-align: left;
  color: white;
}
.mediaImg{
  min-width: 300px;
  min-height: 450px;
}
.mediaImg img {
  width: 100%;
  height: 100%;
}
h2, h3, p{
  margin: 10px 0;
  z-index: 2;
}
h2{
  border-bottom: 2px solid #ebb446;
}
p{
  width: 80%;
  height: 150px;
  overflow-y: scroll;
  padding-right: 5px;
  line-height: 1.6;
}
.aboutMedia{
  padding: 20px 80px 20px 20px;
}
.providers{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.provider{
  margin-right: 10px;
}
.logo{
  width: 50px;
  height: 50px;
  border-radius: 10px;
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
  top: 15px;
  right: 15px;
  transition: .2s ease-in-out;
  z-index: 2;
}
.imgBtn:hover{
  background-color: #ebb446;
  color: black;
}
.imgBtn:focus{
  outline: none;
}
li:hover .imgBtn{
  transform: scale(1);
}
.backgroundImage{
  display: none;
  filter: brightness(50%);
  position: absolute;

  min-width: 100%;
  min-height: 100%;
  max-width: 100%;
  max-height: 100%;

  user-select: none;
  background: #242323;
}
.backgroundGradient:after{
  display: none;
  position: absolute;
  content:"";
  height:100%;
  width:100%;
  top:0;
  left:0;
  background: linear-gradient(to bottom, transparent 0%, black 100%);
}
@media screen and (max-width: 800px){
  .mediaImg{
    display: none;
  }
  .backgroundImage, .backgroundGradient::after{
    display: block;
  }
  .aboutMedia{
    position: absolute;
    width: 250px;
  }
  p{
    width: 100%;
  }
  .logo{
    width: 40px;
    height: 40px;
  }
}
::-webkit-scrollbar{
  display: inline-block;
  width: 3px;
}
::-webkit-scrollbar-track {
  background: #171616;
}
::-webkit-scrollbar-thumb {
  background: #ebb446;
}
</style>