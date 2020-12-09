<template>

  <div  class="container">

    <div class="backgroundGradient">
      <img class="backgroundImage" v-bind:src="this.imagebg" alt="Background image"/>
    </div>

    <button v-on:click="hideInfo">X</button>

    <div class="information">

      <img class="mediaImg" v-bind:src="this.image" alt="Image of the selected media"  />

      <div class="column">
        <h2>{{ this.title }}</h2>
        <h3>Rating: {{ this.rating }}</h3>

        <div class="overview">
          <p v-if="this.info.length === 0">No information found</p>
          <p>{{ this.info }}</p>
        </div>

        <h3 v-if="providers !== null">Available in:</h3>
        <div class="providers" v-if="providers !== null">
          <div class="provider" v-for="provider in this.providers" :key="provider.index">
            <img class="logo" v-bind:src="`http://image.tmdb.org/t/p/original/${provider.logo_path}`" alt="Logo of provider"
                 @click="openProvider(provider.provider_name)"/>
            <!--p @click="openProvider(provider.provider_name)">{{provider.provider_name}}</p-->
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
      imagebg: null,
      info: '',
      rating: '',
      providers: null
    }
  },
  props: {
    identity: Number,
    movie: Boolean
  },
  /**
   * Information "created" function makes API calls depending on the variable identity the component gets. The API call
   * contains information related to the media and also the providers the media has.
   */
  created: function () {
    let url = '';
    if(this.movie){url = `https://api.themoviedb.org/3/movie/${this.identity}?api_key=7a1108dafa3ea1ef83a43e999a63f38b&language=en-US&append_to_response=watch%2Fproviders`;}
    else{url = `https://api.themoviedb.org/3/tv/${this.identity}?api_key=7a1108dafa3ea1ef83a43e999a63f38b&language=en-US&append_to_response=watch%2Fproviders`;}
    axios
        .get(url)
        .then(res => {
          this.image = `http://image.tmdb.org/t/p/w500/${res.data.poster_path}`;
          if(res.data.backdrop_path !== null){
            this.imagebg = `http://image.tmdb.org/t/p/w1280/${res.data.backdrop_path}`;
          }
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
    /**
     * Emits an event, which causes the information screen to close
     */
    hideInfo: function () {
      this.$emit('hide:info', this.identity);
    },
    /**
     * Opens a new window with a google search and the providers name a the search query.
     * @param{string} provider name
     */
    openProvider(provider) {
      window.open(`https://www.google.com/search?q=${provider + ' ' + this.title}`, '_blank');
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
.container{
  font-family: 'Montserrat', sans-serif;
  color: White;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: none;
}
.information{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* Height */
.mediaImg, .column{
  height: 700px;
}
/* Left side image */
.mediaImg{
  width: 450px;
  outline: 1px solid #ebb446;
  user-select: none;
}
.column{
  display: flex;
  flex-direction: column;
  text-align: left;
}
/* Margins and paddings */
h3, .overview, .providers{
  margin: 20px;
  padding-left: 30px;
}
/* Width */
h2, .overview, .providers{
  width: 800px;
}
h2{
  margin: 20px 20px 20px 50px;
  font-size: 36px;
  border-bottom: 2px solid #ebb446;
}
h3{
  font-size: 24px;
}
.overview{
  height: 300px;
  overflow-y: scroll;
  padding-right: 5px;
  font-size: 20px;
  line-height: 1.6;
}
.providers{
  display: flex;
  justify-content: flex-start;
}
.provider{
  margin-right: 20px;
}
.logo{
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
.backgroundImage{
  filter: brightness(40%);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  min-width: 1980px;
  min-height: 1080px;
  max-width: 1980px;
  max-height: 1080px;

  user-select: none;
  background: #242323;
}
.backgroundGradient:after{
  position: absolute;
  content:"";
  height:100%;
  width:100%;
  top:0;
  left:0;
  background: linear-gradient(to bottom, transparent 0%, black 100%);
}
button{
  color: #ebb446;
  font-size: 24px;
  font-weight: bolder;

  height: 55px;
  width: 55px;

  background-color: black;
  border: 2px solid black;
  border-radius: 50%;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 3;
}
button:hover{
  background-color: #ebb446;
  color: black;
}
button:focus{
  outline: none;
}
@media screen and (max-width: 1300px){
  .mediaImg, .column{
    height: 500px;
  }
  h3, .overview{
    margin: 15px;
  }
  .overview{
    width: 400px;
    height: 200px;
    font-size: 18px;
    line-height: 1.6;
  }
  .mediaImg{
    width: 300px;
  }
  h2, .providers{
    width: 400px;
  }
  .providers{
    flex-wrap: wrap;
  }
  h2{
    font-size: 24px;
  }
  h3{
    font-size: 20px;
  }
  @media screen and (max-width: 800px){
    .information{
      flex-direction: column;
    }
    h2, h3, .overview, .providers{
      width: 250px;
      margin: 10px;
      padding-left: 0;
    }
    .mediaImg{
      display: none;
    }
    .overview, button{
      font-size: 16px;
    }
    .logo{
      width: 40px;
      height: 40px;
    }
    button{
      height: 40px;
      width: 40px;

      top: 40px;
      right: 40px;
    }
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