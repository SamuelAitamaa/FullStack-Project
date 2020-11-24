<template>
  <div id="nav">
    <div class="navItem">
      <router-link to="/">Logo</router-link>
    </div>
    <div class="navItem">
      <router-link to="/">Search</router-link>
    </div>
    <div class="navItem">
      <input type="text" v-model="input" @input.prevent="handleInput" />
    </div>
    <div class="navItem">
      <router-link to="/profile">Profile</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      input: ''
    }
  },
  methods: {
    handleInput: function () {
      this.$emit('input:change', this.input);
    }
  }
}
</script>

<style scoped>

p{
  color: #ebb446;
}

#nav {
  padding: 30px;
  background: #171616;

  display: flex;
  justify-content: flex-end;
}
.navItem{
  margin: 0 20px;
}
.navItem:first-child{
  margin-right: auto;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
#nav a.router-link-exact-active {
  color: #ebb446;
}
#nav a:hover{
  color: #bf4b91;
}
</style>