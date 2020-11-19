<template>
  <div class="movie">
    <img src="../assets/lotr.jpg" alt="Placeholder image">
    <div class="text">
      <h2>Movie Title</h2>
    </div>
  </div>
</template>

<script>
export default {
name: "Movie"
}
</script>

<style scoped>
.movie{
  display: flex;
  flex-direction: column;
  max-width: 250px;
  position: relative;
}
.text{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;

  text-align: left;
  color: white;
  background: rgba(69, 65, 65, .5);
}
h2{
  padding: 5px 10px;
}
img{
  width: 100%;
}
</style>