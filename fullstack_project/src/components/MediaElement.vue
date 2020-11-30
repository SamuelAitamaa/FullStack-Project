<template>
  <div class="element">
    <img v-bind:src="this.data.poster_path" alt="Placeholder image" v-on:click="changeInfoVisibility" />
    <button v-if="!checkList()" @click="addToList()" class="imgBtn">+</button>
    <button v-else @click="deleteFromList()" class="imgBtn">-</button>
    <Information
        v-bind:id="this.data.id"
        v-bind:identity="this.data.id"
        v-bind:movie="this.data.hasOwnProperty('title')"
        @hide:info="changeInfoVisibility"
    />
  </div>
</template>

<script>
import Information from "@/components/Information";
export default {
  name: "MediaElement",
  components: {
    Information
  },
  data() {
    return {
      infoVisible: false
    }
  },
  props: {
    data: Object
  },
  methods: {
    changeInfoVisibility: function () {
      this.infoVisible = !this.infoVisible;
      let element = document.getElementById(this.data.id);
      if(this.infoVisible){
        element.style.display = 'block';
      }else{
        element.style.display = 'none';
      }
    },
    addToList() {
      this.$store.commit("newId", this.data.id)
    },
    checkList() {
      let store = JSON.stringify(this.$store.state.movies)
      return store.includes(this.data.id)
    },
    deleteFromList() {
      this.$store.commit("deleteID", this.data.id)
    }
  }
}
</script>

<style scoped>
.element{
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 375px;
  position: relative;
}
.imgBtn{
  transform: scale(0);

  color: #ebb446;
  background-color: black;
  font-size: 36px;

  font-weight: bolder;
  height: 50px;
  width: 50px;

  border: none;
  border-radius: 50%;

  position: absolute;
  top: 10px;
  right: 10px;

  user-select: none;
  transition: .2s ease-in-out;
}
.imgBtn:hover{
  background-color: #ebb446;
  color: black;
}
.imgBtn:active{
  background-color: #ff5520;
}
.imgBtn:focus{
  outline: none;
}
li:hover .imgBtn{
  transform: scale(1);
}
img{
  width: 100%;
  height: 100%;

  user-select: none;

  transition: .2s ease-in-out;
}
li:hover img{
  outline: 2px solid #ebb446;
}
li:active img{
  outline: 8px solid #ebb446;
}
</style>