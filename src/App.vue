<template>
  <router-view/>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      const url = new URL(window.location.href)
      const route = url.searchParams.get('route')
      if (route) {
        this.$router.push(route)
      }
    }
  }
</script>

<style lang="scss">


  * {
    box-sizing: border-box;
    font-family: Outfit-Light ,serif;
  }
  #app {
    width: 100%;
    height: 100%;
  }
  body, html {
    width: 100%;
    height: 100%;
  }
</style>
