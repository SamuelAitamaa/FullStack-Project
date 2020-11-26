<template>
  <div id="nav">
    <div class="navItem">
      <router-link to="/"><img src="../assets/logos.png" alt="Logo of the application"></router-link>
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
    <div class="navItem">
      <router-link to="/login">Login</router-link>
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;1,100&display=swap');
#nav {
  padding: 10px;
  background: linear-gradient(black, #171616);

  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
}
.navItem{
  margin: 0 20px;
}
.navItem:first-child{
  margin-right: auto;
}

img{
  width: 80px;
  height: 80px;
  border: 3px solid #ebb446;
  border-radius: 50%;

  transition: .4s ease-in-out;
}
img:hover{
  transform: rotateZ(360deg);
}

input{
  height: 30px;
  width: 200px;
  padding-left: 5px;
  outline: none;
  border-radius: 5px;
  background: #fffdbf;

  font-size: 20px;
  font-family: 'Montserrat', sans-serif;

  transition: .2s ease-in-out;
}
input:focus{
  width: 300px;
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