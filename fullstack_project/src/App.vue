<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "Main",
  watch: {
    $route(to) {
      document.title = `MyMovie - ${to.meta.title}`;
      const link = document.querySelector("[rel='icon']")
      link.setAttribute('href',to.meta.icon)
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
::-webkit-scrollbar {
  display: none;
}
</style>
