<template>

  <div  class="information">

    <div class="background-image">
      <img class="imgbg" v-bind:src="this.imagebg" alt="image2"/>
    </div>

    <div class="container"   >



      <button v-on:click="hideInfo">X</button>


        <img class="coverimg" v-bind:src="this.image" alt="Placeholder image"  />

      <div class="titleAndDesc">


        <h2>{{ this.title }}</h2>
        <div><p v-if="this.info.length === 0">No information found</p><p>{{ this.info }}</p></div>
        <h3>Rating: {{ this.rating }}</h3>
        <div class="providers">
          <div class="provider" v-for="provider in this.providers" :key="provider.index">
            <img class="logo" v-bind:src="`http://image.tmdb.org/t/p/original/${provider.logo_path}`" alt="Placeholder image" @click="openProvider(provider.provider_name)"/>
            <p @click="openProvider(provider.provider_name)">{{provider.provider_name}}</p>
          </div>
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
      imagebg:'',
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
       this.imagebg = `http://image.tmdb.org/t/p/original/${res.data.backdrop_path}`;
          if(this.movie){this.title = res.data.title;}
          else{this.title = res.data.name;}
          this.identity = res.data.id;
          this.info = res.data.overview;
          this.rating = res.data.vote_average;
          if(JSON.stringify(res.data["watch/providers"].results).includes("FI") &&
             res.data["watch/providers"].results.FI !== undefined) {
            if(this.movie){
              this.providers = res.data["watch/providers"].results.FI.buy
            }else {
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
//<div.background-image>
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

  .imgbg{
    filter: brightness(40%);
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    border: 2px solid #ebb446;
    min-height: 70%;

  }

  .information{
    font-family: 'Montserrat', sans-serif;
    color: White;
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    display: none;


  }
  .container{
    width: 70%;
    min-height: 70%;
    height: auto;
    max-height: 600px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 40px 10px 40px 10px;
    margin-top: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  }
  h2{
    text-align: left;
    padding-left: 50px;
    font-size: 40px;
    font-weight: bold;

  }
  h3{
    text-align: left;
    padding-left: 50px;
    font-weight: bold;

  }
  .titleAndDesc{
    max-width: 1100px;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin-left: 50px;
  }
  .coverimg{
    width: 550px;
    outline: 1px solid #ebb446;
  }
  p{
    padding: 50px;
    font-size: 30px;
    text-align: justify;
  }
  .providers {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 50px;
  }
  .provider{
    min-width: 300px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .providers p{
    padding: 20px;
  }
  .logo{
    width: 45px;
    height: 45px;
    max-width: 45px;
    min-width: 45px;
  }
  @media screen and (max-width: 1200px){
    .container{
      flex-direction: column;
    }
    .coverimg{
      width: 180px;
    }
    .titleAndDesc{
      width: 600px;
    }
    .titleAndDesc p{
      font-size: 16px;
      padding-top: 25px;
    }
    .titleAndDesc h2{
      font-size: 28px;
      padding-top: 12px;
    }
    @media screen and (max-width: 600px){
      .coverimg{
        width: 150px;
      }
      .titleAndDesc{
        width: 400px;
      }
      .titleAndDesc p{
        font-size: 12px;
        padding-top: 12px;
      }
      .titleAndDesc h2{
        font-size: 14px;
      }
      .titleAndDesc h3{
        font-size: 12px;
      }
    }
  }

  button{
    color: #ebb446;
    font-size: 24px;
    font-weight: bolder;
    height: 55px;
    width: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    border: none;
    border-radius: 50%;
    position: fixed;
    top: 15px;
    right: 15px;
    z-index: 101;
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
</style>