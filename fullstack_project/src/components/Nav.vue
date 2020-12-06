<template>
  <div id="nav">
    <div class="navItem" @click="flushSearch()">
      <router-link to="/"><img src="../assets/logos.png" alt="Logo of the application"></router-link>
    </div>
    <div class="navItem">
      <input type="text" v-model="input" @input.prevent="handleInput" placeholder="Search..." />
    </div>
    <div class="navItem hideSmall" v-if="this.width > 800">
      <router-link to="/profile">Profile</router-link>
    </div>
    <div class="navItem hideSmall" v-if="this.width < 800 && this.$router.currentRoute.path === '/changepassword' ||
    this.$router.currentRoute.path === '/changeusername'">
      <router-link to="/profile">Profile</router-link>
    </div>
    <div class="navItem hideSmall" v-if="this.width < 800 && this.$router.currentRoute.path === '/login' ||
    this.$router.currentRoute.path === '/register'">
      <router-link to="/">Home</router-link>
    </div>
    <div class="navItem hideSmall" v-if="this.width < 800 && this.$router.currentRoute.path === '/'">
      <router-link to="/profile">Profile</router-link>
    </div>
    <div class="navItem hideSmall" v-if="this.width < 800 && this.$router.currentRoute.path === '/profile'">
      <router-link to="/">Home</router-link>
    </div>
    <div class="navItem hideSmall" v-if="this.$store.state.user === null">
      <router-link to="/login">Login</router-link>
    </div>
    <div class="navItem hideSmall" v-if="this.$store.state.user !== null">
      <button @click="logout">Logout</button>
    </div>
    <div class="navItem hideBig">
      <div class="dropdown">
        <button id="menu">Menu</button>
        <div class="dropContent">
          <router-link to="/profile">Profile</router-link>
          <router-link to="/">Home</router-link>
          <router-link to="/login" v-if="this.$store.state.user === null">Login</router-link>
          <button @click="logout" v-if="this.$store.state.user !== null">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      input: '',
      width: ''
    }
  },
  methods: {
    handleInput: function () {
      this.$emit('input:change', this.input);
    },
    logout: function () {
      this.$store.commit('delUser');
      if(this.$router.currentRoute.path !== "/"){
        this.$router.push("/");
      }
    },
    handleResize: function () {
      this.width = window.innerWidth;
    },
    flushSearch: function () {
      this.input = '';
      this.$emit('input:change', this.input);
    }
  },
  created: function () {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
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
  height: 50px;
  width: 400px;
  padding-left: 10px;
  outline: none;
  background: black;
  color: #ebb446;
  border: none;
  border-bottom: 2px solid #ebb446;

  font-size: 20px;
  font-family: inherit;

  transition: .2s ease-in-out;
}
input:focus{
  background: #171616;
}
#nav a {
  font-weight: bold;
  color: #ebb446;
  text-decoration: none;
}
#nav a.router-link-exact-active {
  color: #ebb446;
}
#nav a:hover{
  color: #bf4b91;
}
button {
  font-size: 17px;
  font-weight: bold;
  font-family: inherit;
  color: #ebb446;
  border: none;
  background: none;
  cursor: pointer;
}
button:hover {
  color: #bf4b91;
}
button:active{
  outline: none;
}
.hideBig{
  display: none;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropContent {
  display: none;
  position: absolute;
  right: 0;
  background-color: #171616;
  min-width: 160px;
  z-index: 1;
  outline: none;

}
.dropContent a.router-link-active, .dropContent a , .dropContent a.router-link-exact-active, .dropContent button{
  padding: 12px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ebb446;
}
.dropdown:hover .dropContent {
  display: block;
}
@media screen and (max-width: 800px){
  img{
    transform: scale(0);
  }
  input{
    width: 220px;
  }
  @media all and (max-width: 500px){
    .hideSmall{
      display: none;
    }
    .hideBig{
      display: block;
    }
    input{
      width: 120px;
    }
  }
}
</style>