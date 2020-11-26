<template>
<div class="profile">
  <Nav @input:change="inputChange" />

  <h1>User</h1>
  <h2>Settings</h2>

  <div v-if="ids.length>0">
    <ul>
      <Heading v-bind:title="titles[0]" v-bind:search="false" />
      <li v-for="id in ids" v-bind:key="id">
        <WatchLater class="WatchLater" v-bind:id=id.id />
      </li>
    </ul>
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

export default {
  name: "Profile",
  components: {
    WatchLater,
    Nav,
    Heading
  },
  data() {
    return {
      input: '',
      ids: [],
      titles: [
          'Watch Later'
      ]
    }
  },
  created() {
    this.ids = this.$store.state.movies
  },
  methods: {
    inputChange(emit){
      this.input = emit;
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