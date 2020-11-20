<template>
  <div class="searchList">
    <ul>
      <li><Search index=0 :query=this.input /></li>
      <li><Search index=1 :query=this.input /></li>
      <li><Search index=2 :query=this.input /></li>
      <li><Search index=3 :query=this.input /></li>
      <li><Search index=4 :query=this.input /></li>
      <li><Search index=5 :query=this.input /></li>
      <li><Search index=6 :query=this.input /></li>
      <li><Search index=7 :query=this.input /></li>
      <li><Search index=8 :query=this.input /></li>
      <li><Search index=9 :query=this.input /></li>
      <li><Search index=10 :query=this.input /></li>
      <li><Search index=11 :query=this.input /></li>
    </ul>
  </div>
</template>

<script>
import Search from "@/components/Search";

export default {
  name: "SearchList",
  components: {
    Search
  },
  props: {
    input: String
  }
}
</script>

<style scoped>
ul{
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}
ul li{
  list-style-type: none;
  padding: 20px;
  user-select: none;
}
</style>