<template>
  <div id="nav">
    <div class="navItem">
      <router-link to="/">Hamburger</router-link>
    </div>
    <div class="navItem">
      <router-link to="/">Search</router-link>
    </div>
    <div class="navItem">
      <input type="text">
    </div>
    <div class="navItem">
      <router-link to="/">Profile</router-link>
    </div>
  </div>
</template>

<script>
export default {
name: "Nav"
}
</script>

<style scoped>
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