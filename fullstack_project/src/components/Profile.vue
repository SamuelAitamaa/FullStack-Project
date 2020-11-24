<template>
<div class="profile">
  <Nav @input:change="inputChange" />
  <h1>User</h1>
  <h2>Settings</h2>

  <header>
    <h1>Watch Later</h1>
  </header>
  <div class="container">
    <WatchLater class="WatchLater" v-bind:id=15 />
    <WatchLater class="WatchLater" v-bind:id=26 />
  </div>

</div>
</template>

<script>

import Nav from "@/components/Nav";
import WatchLater from "@/components/WatchLater";

export default {
  name: "Profile",
  components: {
    Nav,
    WatchLater,
  },
  data() {
    return {
      input: '',
      id : ''
    }
  },
  methods: {
    inputChange(emit) {
      this.input = emit;
    },
    getId(emit) {
      this.id = emit
      console.log(this.id)
      // After getting id, create new WatchLater into container with the catched id
    }

  }
}
</script>

<style scoped>

.profile{
  background: #242323;
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