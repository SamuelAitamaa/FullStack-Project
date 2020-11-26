<template>
<div class="profile">
  <Nav @input:change="inputChange" />

  <h1>User</h1>
  <h2>Settings</h2>

  <header>
    <h1>Watch Later</h1>
  </header>

  <div class="container" v-if="ids.length>0">
    <ul>
      <li v-for="id in ids" v-bind:key="id.id">
        <WatchLater class="WatchLater" v-bind:id=id.id />
      </li>
    </ul>
  </div>

  <div v-else class="container">
    <h2>It seems empty here. Get started by adding movies to your watch list!</h2>
  </div>

</div>
</template>

<script>

import WatchLater from "@/components/WatchLater";
import Nav from "@/components/Nav";

export default {
  name: "Profile",
  components: {
    WatchLater,
    Nav
  },
  data() {
    return {
      input: '',
      ids: [],
    }
  },
  created() {
    this.ids = this.$store.state.movies
  },
  methods: {
    inputChange(emit){
      this.input = emit;
    }
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