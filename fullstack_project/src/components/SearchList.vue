<template>
  <div class="searchList">
    <ul>
      <li v-for="element in this.elements" :key="element.id">
        <div class="search">
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
import axios from 'axios';
export default {
  name: "SearchList",
  components:{
    Information
  },
  data(){
    return {
      elements: []
    }
  },
  props: {
    input: String
  },
  watch: {
    /**
     * As the input changes, make calls from the API with the input as a search query
     */
    input: function() {
      axios
      .get(`https://api.themoviedb.org/3/search/multi?query=${this.input}&api_key=7a1108dafa3ea1ef83a43e999a63f38b`)
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
  },
  methods: {
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
     * Saves media to database and Vuex store and immediately gets the new list to update the list in profile screen.
     * Also emits an event, which will cause Profile pages list to update.
     * @param{object} element to be added to
     */
    addToList(element) {
      this.$emit("update:list");
      this.$store.commit("saveMedia", element)
      this.getListFromDb(this.$store.state.user[0]);
    },
    /**
     * Checks if the user has a movie or series with a name and id and changes the button on the media accordingly.
     * @param{object} element will be checked
     * @returns {boolean} true if the id and name is found from Vuex store, else false
     */
    checkList(element) {
      let store = JSON.stringify(this.$store.state.movies)
      return store.includes(JSON.stringify(element.id)) && (store.includes(JSON.stringify(element.title)) || (store.includes(JSON.stringify(element.name))))
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
    /**
     * Hides the buttons on the media completely, if the user is not logged in
     * @returns {boolean} true if the user is logged in, else false
     */
    hideBtn: function () {
      return this.$store.state.user === null;
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
  padding: 15px;
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