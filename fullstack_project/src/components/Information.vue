<template>
  <div class="information">
    <button v-on:click="hideInfo">X</button>
    <div class="container">
      <img v-bind:src="this.image" alt="Placeholder image" />
      <div class="titleAndDesc">
        <h2>{{ this.title }}</h2>
        <ul>
          <li v-for="genre in this.genres" :key="genre">
            <p> / {{ genre }} / </p>
          </li>
        </ul>
        <p v-if="this.info.length > 0"
        >{{ this.info }}</p>
        <p v-else
        >No overview available ... :(</p>
        <div class="date">
          <p v-if="this.released.length > 0 && this.movie"
          >Released: {{ this.released }}</p>
          <p v-if="this.released.length > 0 && !this.movie"
          >First aired: {{ this.released }}</p>
        </div>
        <div class="link">
          <a v-if="this.homepage.length > 0"
             :href="this.homepage"
             target="_blank"
          >Link to site</a>
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
      genres: [],
      image: '',
      info: '',
      released: '',
      homepage: ''
    }
  },
  props: {
    identity: Number,
    movie: Boolean
  },
  created: function () {
    let url;
    if(this.movie){url = `https://api.themoviedb.org/3/movie/${this.identity}?api_key=7a1108dafa3ea1ef83a43e999a63f38b`;}
    else{url = `https://api.themoviedb.org/3/tv/${this.identity}?api_key=7a1108dafa3ea1ef83a43e999a63f38b`;}
    axios
        .get(url)
        .then(res => {
          this.identity = res.data.id;
          this.image = `http://image.tmdb.org/t/p/w300/${res.data.poster_path}`;
          if(this.movie){this.title = res.data.title;}
          else{this.title = res.data.name;}
          res.data.genres.forEach(genre => this.genres.push(genre.name));
          this.info = res.data.overview;
          if(this.movie){this.released = res.data.release_date;}
          else{this.released = res.data.first_air_date;}
          if(res.data.homepage !== ""){this.homepage = res.data.homepage;}
        })
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
  background-image: linear-gradient(to top, black, #171616);

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
  padding-top: 20px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media screen and (max-width: 1200px){
  .container{
    flex-direction: column;
  }
  .container img{
    width: 180px;
  }
  .titleAndDesc{
    width: 600px;
  }
  .titleAndDesc p, .titleAndDesc a{
    font-size: 16px;
  }
  .titleAndDesc h2{
    font-size: 36px;
  }
  @media screen and (max-width: 600px){
    .container img{
      width: 150px;
    }
    .titleAndDesc{
      width: 400px;
    }
    .titleAndDesc p, .titleAndDesc a{
      font-size: 12px;
    }
    .titleAndDesc h2{
      font-size: 14px;
    }
  }
}
ul{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
}
ul li {
  list-style-type: none;
}
.titleAndDesc{
  max-width: 800px;
  padding: 20px;
}
img{
  width: 400px;
  outline: 1px solid #ebb446;
}
h2{
  font-size: 36px;
  border-bottom: 1px solid #ebb446;
  margin-bottom: 20px;
}
p{
  font-size: 20px;
  text-align: justify;
}
.date{
  padding: 10px 0;
}
.link{
  text-align: left;
}
a{
  text-decoration: none;
  font-size: 24px;
  color: #ff724f;
}
a:visited{
  color: #ff738f;
}
a:hover{
  color: #ffe94f;
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