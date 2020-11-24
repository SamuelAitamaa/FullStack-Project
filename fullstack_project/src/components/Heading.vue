<template>
  <header>
    <div class="heading">
      <div class="headingItem"><h1>{{ this.title }}</h1></div>
      <div class="headingItem"><button v-on:click="scrollLeft">&lt;</button></div>
      <div class="headingItem"><button v-on:click="scrollRight">&gt;</button></div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Heading",
  props: {
    title: String
  },
  methods: {
    scrollRight: function () {
      console.log("Scrolling right...");
    },
    scrollLeft: function () {
      console.log("Scrolling left...");
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;1,100&display=swap');
header{
  text-align: left;
  color: white;
  padding: 20px;
  font-family: 'Montserrat', sans-serif;
}
.heading{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid white;
}
.headingItem:first-child{
  margin-right: auto;
}
.headingItem{
  padding: 0 10px;
}
button{
  font-family: inherit;
  font-size: 24px;
  font-weight: bold;

  width: 40px;
  height: 40px;

  background-color: transparent;
  border: 2px solid #ebb446;
  border-radius: 50%;
  color: #ebb446;
  outline: none;
  margin-bottom: 10px;

  transition: .2s ease-in-out;
}
button:hover{
  background-color: #ebb446;
  color: #171616;
}
</style>