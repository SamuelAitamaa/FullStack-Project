<template>
<div class="profile">
  <Nav @input:change="inputChange" />

  <h1>User</h1>
  <h2>Settings</h2>

  <div v-if="elements.length>0">
    <ul>
      <Heading v-bind:title="titles[0]" v-bind:search="false" />
      <li v-for="element in elements" v-bind:key="element.id">
        <WatchLater class="WatchLater" v-bind:id=element.id />
      </li>
    </ul>
    <div v-for="element in this.elements" :key="element.id">
      <Information v-bind:id="element.id" v-bind:identity="element.id" v-bind:movie="element.hasOwnProperty('title')"
                   @hide:info="changeInfoVisibility"/>
    </div>
  </div>

  <div v-else class="container">
    <ul>
      <Heading v-bind:title="titles[0]" v-bind:search="false" />
      <li>
        <h2>It seems empty here. Get started by adding movies to your watch list!</h2>
      </li>
    </ul>
  </div>

</div>
</template>

<script>

import WatchLater from "@/components/WatchLater";
import Nav from "@/components/Nav";
import Heading from "@/components/Heading";
import Information from "@/components/Information";

export default {
  name: "Profile",
  components: {
    WatchLater,
    Nav,
    Heading,
    Information
  },
  data() {
    return {
      input: '',
      elements: [],
      titles: [
          'Watch Later'
      ]
    }
  },
  created() {
    this.elements = this.$store.state.movies
  },
  methods: {
    inputChange(emit){
      this.input = emit;
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
    clearList() {

    },
  }
}
</script>

<style scoped>

.profile {
  background-color: #242323;
  min-height: 100vh;
}
.container {
  min-height: 100%;
  background-color: #242323;
}

header{
  text-align: left;
  color: white;
  padding: 20px;
}

h1, h2{
  text-align: left;
  color: white;
  padding: 20px;
}

</style>