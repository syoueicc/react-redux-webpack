<template>
  <div>
    <img src="./images/logo.png" alt="">
    <p>hello, {{world}}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        world: "world"
      }
    }
  }
</script>

<style>
  @import "~normalize.css/normalize.css";
</style>
