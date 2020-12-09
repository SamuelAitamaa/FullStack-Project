<template>
  <div class="movieList">
    <ul>
      <li v-for="(element, index) in this.elements" :key="index">
        <div class="mediaImg">
          <img v-bind:src="element.poster_path" alt="Placeholder image" v-on:click="changeInfoVisibility(element.id)"/>
          <button v-if="!checkList(element) && !hideBtn()" @click="addToList(element)" class="imgBtn">+</button>
          <button v-if="checkList(element) && !hideBtn()" @click="deleteFromList(element)" class="imgBtn">-</button>
          <Information v-bind:id="element.id" v-bind:identity="element.id" v-bind:movie="element.hasOwnProperty('title')"
                       @hide:info="changeInfoVisibility"/>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Information from "@/components/Information";
import axios from "axios";
export default {
  name: "MovieList",
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
    genre: Number
  },
  /**
   * MovieList "created" function makes API calls to TMDB to get movies and series.
   * Genre 0 is unused by the API so if the genre is 0, then trending media will be called.
   * If the genre is other than zero and corresponds a genre, then media that have the genre
   * will be called. For API calls we use axios.
   */
  created: function() {
    if(this.genre === 0){
      let one = `https://api.themoviedb.org/3/trending/all/week?page=1&api_key=7a1108dafa3ea1ef83a43e999a63f38b`;
      let two = `https://api.themoviedb.org/3/trending/all/week?page=2&api_key=7a1108dafa3ea1ef83a43e999a63f38b`;
      let three = `https://api.themoviedb.org/3/trending/all/week?page=3&api_key=7a1108dafa3ea1ef83a43e999a63f38b`;
      let reqOne = axios.get(one);
      let reqTwo = axios.get(two);
      let reqThree = axios.get(three);
      axios.all([reqOne, reqTwo, reqThree]).then(axios.spread((...res) => {
        res[0].data.results.forEach(element => this.elements.push(element));
        res[1].data.results.forEach(element => this.elements.push(element));
        res[2].data.results.forEach(element => this.elements.push(element));
        this.setImages(this.elements);
      }))
    }else{
      let one = `https://api.themoviedb.org/3/movie/popular?with_genres=${this.genre}&api_key=7a1108dafa3ea1ef83a43e999a63f38b`;
      let two = `https://api.themoviedb.org/3/tv/popular?with_genres=${this.genre}&api_key=7a1108dafa3ea1ef83a43e999a63f38b`;
      let reqOne = axios.get(one);
      let reqTwo = axios.get(two);
      axios.all([reqOne, reqTwo]).then(axios.spread((...res) => {
        res[0].data.results.forEach(element => this.elements.push(element));
        res[1].data.results.forEach(element => this.elements.push(element));
        this.shuffle(this.elements);
        this.setImages(this.elements);
      }))
    }
  },
  methods: {
    /**
     * Shuffles an arrays content
     * @param{array} array to be shuffled
     */
    shuffle: function (array) {
      let index = array.length;
      while (index !== 0) {
        let rndIndex = Math.floor(Math.random() * index);
        index -= 1;
        let temp = array[index];
        array[index] = array[rndIndex];
        array[rndIndex] = temp;
      }
    },
    /**
     * Sets images to elements, since the API just gives the path to the images, not the whole url.
     * If the media doesn't have a path to the image, it will be deleted from the list.
     * @param{array} array to which the images will be set
     */
    setImages: function (array) {
      array.reduceRight(function (acc, element, index, elements) {
        if(element.poster_path === null || element.poster_path === undefined){
          elements.splice(index, 1);
        }else{
          element.poster_path = `http://image.tmdb.org/t/p/w300/${element.poster_path}`;
        }
      }, []);
    },
    /**
     * Changes the information visibility of a media. Each movie and series will have their information printed
     * with them, but will not be displayed unless the user clicks on the image of the media. If information is
     * displayed, scrolling will be disabled. When the user closes the information screen, scrolling will be enabled.
     * @param{string} id of the media whose information will be displayed
     */
    changeInfoVisibility: function (id) {
      this.infoVisible = !this.infoVisible;
      let element = document.getElementById(id);
      if(this.infoVisible){
        element.style.display = 'block';
        this.disableScrolling();
      }else{
        element.style.display = 'none';
        this.enableScrolling();
      }
    },
    /**
     * Disables the scrolling of the page
     */
    disableScrolling(){
      let x = window.scrollX;
      let y = window.scrollY;
      window.onscroll = function(){window.scrollTo(x, y);};
    },
    /**
     * Enables the scrolling of the page
     */
    enableScrolling(){
      window.onscroll = function(){};
    },
    /**
     * Saves media to database and Vuex store and immediately gets the new list to update the list in profile screen.
     * @param{object} element to be added to
     */
    addToList(element) {
      this.$store.commit("saveMedia", element)
      this.getListFromDb(this.$store.state.user[0]);
    },
    /**
     * Checks if the user has a movie or series with a name and id and changes the button on the media accordingly.
     * @param{object} element will be checked
     * @returns {boolean} true if the id and name is found from Vuex store, else false
     */
    checkList(element) {
      let store = JSON.stringify(this.$store.state.movies);
      return store.includes(JSON.stringify(element.id)) && (store.includes(JSON.stringify(element.title)) || (store.includes(JSON.stringify(element.name))))
    },
    /**
     * Hides the buttons on the media completely, if the user is not logged in
     * @returns {boolean} true if the user is logged in, else false
     */
    hideBtn: function () {
      return this.$store.state.user === null;
    },
    /**
     * Deletes media from the database and Vuex store
     * @param{object} element to be deleted
     */
    deleteFromList(element) {
      this.$store.commit("deleteMedia", element)
    },
    /**
     * Get the list from database depending on user id
     * @param{number} id of the user
     */
    getListFromDb(id) {
      let url;
      try {
        url = 'http://localhost:8081/backend/getList'
        console.log(url)
        axios.get(url, {
          params: {
            user_id: id
          }
        }).then(res => {
          console.log(res);
          if(res.data === "Error"){
            console.log('Didn\'t get anything from db');
          }else{
            console.log(res.data);
            let result = res.data;
            result = result.split(",");
            let alteredResult = [];
            result.forEach(element => alteredResult.push(element))
            console.log('Altered result ' + alteredResult)
            this.$store.commit("saveMediaList", alteredResult)
          }
        }).catch(err => {
          console.log(err.response);
        });
      } catch (error) {
        console.log('Error in async: ' + error);
      }
    },
  }
}
</script>

<style scoped>
ul{
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
  overflow-x: scroll;
  scroll-behavior: smooth;
  transition: .2s ease-in-out;
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
.mediaImg{
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