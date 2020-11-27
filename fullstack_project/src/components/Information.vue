<template>
  <div class="information">
    <button v-on:click="hideInfo">X</button>
    <div class="container">
      <img v-bind:src="this.image" alt="Placeholder image" />
      <div class="titleAndDesc">
        <h2>{{ this.title }}</h2>
        <p>{{ this.info }}</p>
        <h2>Rating: {{this.rating}}</h2>
        <div class="providers" v-for="provider in this.providers" :key="provider.index">
          <p>{{provider.provider_name}}</p>
          <img class="logo" v-bind:src="`http://image.tmdb.org/t/p/original/${provider.logo_path}`" alt="Placeholder image" @click="openProvider(provider.provider_name)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Information",
  data(){
    return {
      title: '',
      image: '',
      info: '',
      rating: '',
      providers: []
    }
  },
  props: {
    identity: Number,
    movie: Boolean
  },
  created: function () {
    let url = '';
    if(this.movie){url = `https://api.themoviedb.org/3/movie/${this.identity}?api_key=7a1108dafa3ea1ef83a43e999a63f38b&language=en-US&append_to_response=watch%2Fproviders`;}
    else{url = `https://api.themoviedb.org/3/tv/${this.identity}?api_key=7a1108dafa3ea1ef83a43e999a63f38b&language=en-US&append_to_response=watch%2Fproviders`;}
    axios
        .get(url)
        .then(res => {
          this.image = `http://image.tmdb.org/t/p/w300/${res.data.poster_path}`;
          if(this.movie){this.title = res.data.title;}
          else{this.title = res.data.name;}
          this.identity = res.data.id;
          this.info = res.data.overview;
          this.rating = res.data.vote_average;
          if(this.movie) {
            if(JSON.stringify(res.data["watch/providers"].results).includes("FI")) {
              this.providers = res.data["watch/providers"].results.FI.buy
            }
            } else {
            if(JSON.stringify(res.data["watch/providers"].results).includes("FI")) {
              this.providers = res.data["watch/providers"].results.FI.flatrate
            }
          }
        })
  },
  methods: {
    hideInfo: function () {
      this.$emit('hide:info', this.identity);
    },
    openProvider(provider) {
      window.open(`https://www.google.com/search?q=${provider}`, '_blank');
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
.information{
  font-family: 'Montserrat', sans-serif;
  color: #ebb446;
  background-color: #171616;

  width: 100vw;
  height: 101vh;

  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  z-index: 100;
  display: none;
}
.container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 1200px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media screen and (max-width: 1200px){
  .container{
    flex-direction: column;
  }
}
.titleAndDesc{
  max-width: 800px;
}
img{
  width: 400px;
  outline: 1px solid #ebb446;
}
p{
  padding: 50px;
  font-size: 24px;
  text-align: justify;
}
button{
  color: #ebb446;
  font-size: 24px;
  font-weight: bolder;

  height: 50px;
  width: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: black;
  border: none;
  border-radius: 50%;

  position: fixed;
  top: 10px;
  right: 10px;

}
button:hover{
  background-color: #ebb446;
  color: black;
}
button:active{
  background-color: #ff724f;
}
button:focus{
  outline: none;
}
.providers {
  display: inline-block;
  padding: 10px 10px;
  line-height: 100%;
}
img.logo{
  width: 45px;
  height: 45px;
}

</style>