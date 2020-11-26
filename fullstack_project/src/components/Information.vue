<template>
  <div class="information">
    <button v-on:click="hideInfo">X</button>
    <div class="container">
      <img v-bind:src="this.image" alt="Placeholder image" />
      <div class="titleAndDesc">
        <h2>{{ this.title }}</h2>
        <p>{{ this.info }}</p>
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
    }
  },
  props: {
    identity: Number,
    movie: Boolean
  },
  created: function () {
    if(this.movie){
      axios
          .get(`https://api.themoviedb.org/3/movie/${this.identity}?api_key=7a1108dafa3ea1ef83a43e999a63f38b`)
          .then(res => {
            this.image = `http://image.tmdb.org/t/p/w300/${res.data.poster_path}`;
            this.title = res.data.title;
            this.identity = res.data.id;
            this.info = res.data.overview;
          })
    }else{
      axios
          .get(`https://api.themoviedb.org/3/tv/${this.identity}?api_key=7a1108dafa3ea1ef83a43e999a63f38b`)
          .then(res => {
            this.image = `http://image.tmdb.org/t/p/w300/${res.data.poster_path}`;
            this.title = res.data.name;
            this.identity = res.data.id;
            this.info = res.data.overview;
          })
    }
  },
  methods: {
    hideInfo: function () {
      this.$emit('hide:info', this.identity);
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

</style>